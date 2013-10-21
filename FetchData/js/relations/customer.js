define (['activityModel', 
         'caseModel', 
         'topIssueModel', 
         'backbone', 
         'jquery'], function (activityModel, caseModel, topIssueModel) {

  Customer = Backbone.RelationalModel.extend({
    relations: [{
      type: Backbone.HasMany,
      key: 'animals',
      relatedModel: 'Animal',
      collectionType: 'AnimalCollection',
      reverseRelation: {
        key: 'livesIn',
        includeInJSON: 'id'
        // 'relatedModel' is automatically set to 'Zoo'; the 'relationType' to 'HasOne'.
      }
    },
    {
      type: Backbone.HasMany,
      key: 'animals',
      relatedModel: 'Animal',
      collectionType: 'AnimalCollection',
      reverseRelation: {
        key: 'livesIn',
        includeInJSON: 'id'
        // 'relatedModel' is automatically set to 'Zoo'; the 'relationType' to 'HasOne'.
      }
    },
    {
      type: Backbone.HasMany,
      key: 'animals',
      relatedModel: 'Animal',
      collectionType: 'AnimalCollection',
      reverseRelation: {
        key: 'livesIn',
        includeInJSON: 'id'
        // 'relatedModel' is automatically set to 'Zoo'; the 'relationType' to 'HasOne'.
      }
    }]
  });


  /**
   * @return caseCollection
   */
  return {
    caseCollection: caseCollection
  };
});