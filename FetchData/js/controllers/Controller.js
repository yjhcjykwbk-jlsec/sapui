define (['tableTool', 'ZeroClipboard'], function () {
  
  count = 0;
  
  baseController = {
  
    StringToXML: function (oString) {
      oString = oString.replace ( /_\/\_/g, '_BACKSLASH_' );
      oString = oString.replace ( /\.\_/g, 'DOTCH' );
      oString = oString.replace ( /\+/g, 'PLUSCH' );
      oString = oString.replace ( /GL\/Rollout/g, 'LONGCH' );
      oString = oString.replace ( /\?/g, 'QSTCH' );
      oString = oString.replace ( /\&/g, 'ANDCH' );

      if (window.ActiveXObject) {
        var oXML = new ActiveXObject('Microsoft.XMLDOM');
        oXML.loadXML(oString);
        return oXML;
      }
      else {
        return (new DOMParser()).parseFromString(oString, 'text/xml');
      }
     },
     
     getTimeAgo: function (days) {
       var today = new Date();
       var targetDay= new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
       var month = targetDay.getMonth() + 1;
       var day = targetDay.getDate();
       var year = targetDay.getFullYear();
       var theDay = year * 10000 + month * 100 + day;
       
       return (theDay + '000000');
     },
     
     drawTable: function (instance, tableData) {

       var button = '<button id="back-to-index">BACK</button><br><br>';
       var table = button + '<table id="case-list" rules="all">';
       var jsTableHeader = '<thead><tr>';
       var tableBody = '<tbody><tr>';

       
       for (var prep in instance) {
         if (prep === 'management_summary')
           jsTableHeader += '<th>' + prep + '</th>';
         else
           jsTableHeader += '<th>' + prep + '</th>';
       }
       jsTableHeader += '</tr></thead>';

       tableData.forEach (function (item) {
         for (var attribute in instance) {
           if (item [attribute] === undefined)
             tableBody += '<td></td>';
           else
             tableBody += ('<td>' + item [attribute] + '</td>');
         }
         tableBody += '</tr>';
       });
       tableBody += '<tbody>';
       table += (jsTableHeader + tableBody + '</table>');

       $('.display-area').html (table);
       $('#case-list').dataTable({
         'bJQueryUI': true,
         'sPaginationType': 'full_numbers',
         'sDom': 'T<"clear">lfrtip',
         'oTableTools': {
           'sSwfPath': './swf/copy_csv_xls_pdf.swf',
           'aButtons': [
           'copy',
           'print',
            {
             'sExtends':    'collection',
             'sButtonText': 'Save',
             'aButtons':    [
                             'csv',
                             'xls',
                             'pdf'
                             ]
            }
           ]
         }
       });

     },
     _getLargestObject: function (array) {
       var length =0;
       var Index = 0;
       
       array.forEach (function (item, index) {
         if (length < Object.keys(item).length) {
           length = Object.keys(item).length;
           Index = index;
         }
       });
       
       return Index;
     },

     _reconstruct: function (data) {

       that = this;

       data.forEach (function (item) {
         //Delete useless
         delete item ['__metadata'];
         //Object to be added
         var obj = {};
         //For each property in each case
         for (var attribute in item) {
           //Normal Object
           
           //If property is 'object', break it up to string and add them to properties of each case
           if (typeof (item [attribute]) === 'object' && item[attribute] !==
             null) {

             if (item [attribute].hasOwnProperty('results')) {
               var array = item [attribute].results;

               if (attribute === 'CaseActivity') {
                 var activities = '<table><tr><thead><tr><th>activity_description</th>';
                 activities += '<th>activity_ID</th><th>activity_rating</th></tr></thead><tbody>';
                 array.forEach (function (key) {
                   activities += '<tr>';
                   activities += ('<td>' + key.activity_description + '</td>');
                   activities += ('<td>' + key.activity_ID + '</td>');
                   activities += ('<td>' + key.activity_rating + '</td>');
                   activities += '</tr>';
                 });
                 activities += '</tbody></table>';
                 that.availableFields ['activities'] = true;
                 obj ['activities'] = activities;
               }
               
               else if (attribute === 'TopIssues') {
                 var topIssue = '<table><tr><thead><tr><th>top_issue_description</th>';
                 topIssue += '<th>transaction_id</th><th>top_issue_rating</th></tr></thead><tbody>';
                 array.forEach (function (key) {
                   topIssue += '<tr>';
                   topIssue += ('<td>' + key.top_issue_description + '</td>');
                   topIssue += ('<td>' + key.transactions_id + '</td>');
                   topIssue += ('<td>' + key.top_issue_rating + '</td>');
                   topIssue += '</tr>';
                 });
                 topIssue += '</tbody></table>';
                 that.availableFields ['top_issue'] = true;
                 obj ['top_issue'] = topIssue;
               }
               
               else if (attribute === 'Notes') {
                 var managementSummary = '<table>';
                 array.forEach (function ( key ) {
                   var textContent = key.notes_text_line;
                   if (textContent.indexOf ('Management Summary') !== -1) {

                     textContent = textContent.replace (/\s{2,}/g, '|');
                     textContent = textContent.replace (/\s/, '_');

                     managementSummary += ('<thead><tr><th>' + textContent + '</th></tr></thead>');
                   }
                   else {
                     if (textContent.indexOf (':') !== -1 || textContent.indexOf ('\u2022') !== -1 )
                       managementSummary += ( '</td></tr><tr><td>' + textContent);
                     else
                       managementSummary += (' ' + textContent);
                   }
                 });
                 managementSummary += '</tbody></table>';
                 that.availableFields ['management_summary'] = true;
                 obj ['management_summary'] = managementSummary;
               }
               
               //Delete useless
               delete item [attribute];
             }
             else if (item [attribute].hasOwnProperty('__deferred')) {
               //Delete useless
               delete item [attribute];
             }
           }

           //aet_field XML Object
           else if (attribute === 'aet_fields') {
             if (item [attribute] !== '') {
               var aet_field = that.StringToXML ( item [attribute] );

//               if (item [attribute].indexOf ('?') !== -1) {
//                 console.log (item [attribute]);
//                 console.log (aet_field);
//               }
//               
//               
               $ (aet_field).find('*:not(:has(*))')
                 .each (function (index, value) {
                   // Value will be the Name of the AET TAG where the value is in
//                   console.log ($(this).parent ());
                   
                   var timeConversionArray = ['Go_Live', 'Rollout', 'Last_Review', 'Next_review', 'endate', 'Project_Start', '_date'];
                   var tagName = value.tagName;
                   var text = value.textContent;
                   var parentName = $(this).parent () .get (0).nodeName;

                   if (that._hasElement ( tagName, timeConversionArray ) &&
                   !isNaN (parseInt (text)) && parseInt (text) !== 0) {

                     var year = text.substring ( 0, 4 );
                     var month = text.substring ( 4, 6 );
                     var day = text.substring ( 6, 8 );
                     text = day + '.' + month + '.' + year;
                   }
//TODO:
                     tagName = parentName + '|' + value.tagName;

                     text = text.replace ( /QSTCH/g, '?');
                     text = text.replace ( /ANDCH/g, '&');
                     
                     tagName = tagName.replace ( /_BACKSLASH_/g, '_/_');
                     tagName = tagName.replace ( /DOTCH/g, '._');
                     tagName = tagName.replace ( /PLUSCH/g, '+');
                     tagName = tagName.replace ( /LONGCH/g, 'GL/Rollout');
                     
                     that.availableFields [tagName] = true;
                     obj [tagName] = text;

                 });
               //Delete useless
               delete item [attribute];
             }
           }
           
           else if (attribute.indexOf ('_date') != -1) {
             that.availableFields [attribute] = true;
             var temp = '';
             temp = item [attribute];
             if (temp !== null && temp !== '') {
               //Get the number
               temp = temp.match (/\d+/);
               date = new Date (parseInt (temp));
               //Get day, month, year
               var month = date.getMonth() + 1;
               var day = date.getDate();
               var year = date.getFullYear();
               
               month = month > 9 ? month : ('0' + month);
               day = day > 9 ? day : ('0' + day);
               var theDay = day + '.' + month + '.' + year;

               item [attribute] = theDay;
             }
             else
               item [attribute] = '';
           }
           
           else if (attribute.indexOf ('_time') != -1) {
             that.availableFields [attribute] = true;
             var temp1 = '';
             temp1 = item [attribute];
             if (temp1 !== null && temp1 !== '' && parseInt (temp1) !== 0) {
               
               var year = temp1.substring ( 0, 4 );
               var month = temp1.substring ( 4, 6 );
               var day = temp1.substring ( 6, 8 );
               var theDay = day + '.' + month + '.' + year;

               item [attribute] = theDay;
             }
             else if (temp1 === null)
               item [attribute] = '';
           }
           else
             that.availableFields [attribute] = true;
             
         };
         //Delete Error Record
         delete that.availableFields ['parsererror|h3'];
         delete that.availableFields ['parsererror|div'];
         $.extend(item, obj);
       });
     },
     
     /**
      * Fetch data
      * @param {ID} fetchTimeId - setInterval ID
      */
     _fetchDataSpeed: function ( fetchTimeId ) {//0014307539,0014307539

       that = this;
       this.top = this.episode;
       //Data that already be loaded
       this.loaded = this.top + this.skip;
       BeingLoaded = this.toBeloaded;
       
       if (this.loaded < this.toBeloaded + this.episode) {
         that = this;

         that.fetch({
           //If successfully fetch data, run success function
           success: function () {
             //Get the target array
             var array = that.models[0].attributes.d.results;
             //Merge new data to elder data
             
             that.origianlResult = $.merge(that.origianlResult, array);
             
             that.fetchFinished += that.episode;

             if (that.fetchFinished >= BeingLoaded) {
               //Generate relevant data and table
               that._generate();
             }

             //Set the numbers (loaded/toBeLoaded) on page
             $('.progress-label').text('Loading ...');
             $('#number').html('<strong>' + that.fetchFinished + '/' + that.toBeloaded + '</strong>');
             that._showProgress (that);
           },

           //If fail
           error: function () {
             alert('Fetch Data Error');
             alert ('Return to index page');
//             window.location.href = '#index';
           }
         });
         that.skip += that.episode;

       }

       //If loading finished
       else
       //Stop the timer
         clearInterval (fetchTimeId);
     },
     
     _fetchData: function () {//0014307539,0014307539

         that.fetch({
           //If successfully fetch data, run success function
           success: function () {
             //Get the target array
             var array = that.models[0].attributes.d.results;
//             console.log (that);
             //Merge new data to elder data
             that.origianlResult = $.merge(that.origianlResult, array);
             that.fetchFinished += that.episode;

               //Generate relevant data and table
               that._generate();

             //Set the numbers (loaded/toBeLoaded) on page
             $('.progress-label').text('Loading ...');
             that._showProgress (that);
           },

           //If fail
           error: function () {
             alert('Fetch Data Error');
             alert ('Return to index page');
//             window.location.href = '#index';
           }
         });
     },


     /**
      * Show progress by progress bar
      */
     _showProgress: function () {
       that = this;
       //Get the progress bar element on page
       var progressBar = $('#progressbar');

       //Set the progress value on progress bar (percentage)
       progressBar.progressbar({
         value: that.fetchFinished * 100 / that.toBeloaded
       });

     },

     /**
      * Reset collection data and generate table
      */
     _generate: function () {
       //get original data fetched
       this.data = this.origianlResult;

       //Process the fetched data
       this._reconstruct(this.data);
       //Reset the data of collection with the processed data
//       console.log (JSON.stringify (this.data));

       this.reset (this.data);
       //Start to generate table
       this._generateTable();
     },

     /**
      * Get the count of data and start to fetch data
      */
     _getCount: function () {
       that = this;
       //Get url to get the total length of the data to be fetched
       var url = this.countUrl ();
       $.getJSON (url, function () {
//         that._fetchData (fetchTimeId);
       })
         .fail(function () {
           //If fail
           alert ('Get Count error');
           alert ('Return to index page');
//           window.location.href = '#index';
         })
         .done(function (data) {

           //If secceed, set the gloabal var toBeLoad
           that.toBeloaded = data;
           $('.progress-label').html ('Waiting for Loading...  Total Count: ' + data);
           
           if (data === 0)
             $('.progress-label').append ('<button id="return">Return</button>');
           
           var dividedBy = 9;
           if (data < 90)
             dividedBy = 6;
           else if (data > 240 && data < 360)
             dividedBy = 12;
           else if (data > 360)
             dividedBy = 18;
//           
//           //If Use 'expand' set thread number to be 1
           if (that.caseExpandContent.length > 0)
             dividedBy = 1;
             
           that.episode = Math.ceil (data / dividedBy);
           
           /**
            * Enable speed up
            */
           
//           Fetch the data every 1 second
           fetchTimeId = setInterval (function () {
             //Fetch data
             that._fetchDataSpeed (fetchTimeId);
             //Show the progress bar
           }, 50);
         });
     },

     /**
      * Generate table
      */
     _generateTable: function () {

//       var longestRow = this._getLargestObject (this.data);
       //Get one row of the array
//       var instance = this.data [longestRow];
       var instance = this.availableFields;

       //Get all the data processed
       var tableData = this.data;
       //Set the HTML header, table and table body strings
       this.drawTable (instance, tableData);
     },
     
     _hasElement: function (tagName, array) {
       var flag = false;
       array.forEach (function (item) {
         if (tagName.indexOf (item) !== -1)
           flag = true;
       });
       return flag;
     },

     //For others to extend
     extend: function ( o ) {
       return $.extend ({}, this, o);
     }
  };
  
  return {
    baseController: baseController
  };
});