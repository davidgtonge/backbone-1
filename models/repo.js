(function () {
  'use strict';

  var _ = window._;
  var app = window.app;

  var Repo = app.Repo = app.Model.extend({
    displayName: function () {
      return this.get('owner').login + '/' + this.get('name');
    },

    initialize: function () {
      this.issues = new app.Issue.Collection();
      this.issues.repo = this;
    },

    url: function () {
      var login = this.get('owner').login;
      var name = this.get('name');
      return app.apiRoot + '/repos/' + login + '/' + name;
    },

    urlRoot: function () {
      return app.apiRoot + '/users/' + this.get('owner').login + '/repos';
    },

    toBoard: function () {
      var attrs = _.pick(this.attributes, 'id', 'name');
      attrs.owner = {login: this.get('owner').login};
      return attrs;
    }
  });

  Repo.Collection = app.Model.Collection.extend({
    comparator: function (repo) { return repo.displayName(); },

    model: Repo,

    url: function () {
      if (this.owner) return this.owner.url() + '/repos';
      return app.apiRoot + '/repositories';
    }
  });
})();
