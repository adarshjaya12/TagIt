"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("es6-promise/auto");
var React = require("react");
var fetch = require("isomorphic-fetch");
var DELETE_TAG = "/api/database/DeleteTag?id=";
var IndexListingDisplay = /** @class */ (function (_super) {
    __extends(IndexListingDisplay, _super);
    function IndexListingDisplay(props) {
        return _super.call(this, props) || this;
    }
    IndexListingDisplay.prototype.deleteTag = function (e) {
        var _this = this;
        var tagId = e.currentTarget.attributes["value"].value;
        var apiUrl = DELETE_TAG + tagId;
        fetch(apiUrl).then(function (response) {
            if (response.status >= 200 && response.status < 300) {
            }
            return response.json();
        }).then(function (body) {
            _this.setState({
                tagList: body
            });
            _this.props.updateTagList();
        });
    };
    IndexListingDisplay.prototype.editTag = function (e) {
        var tagId = e.currentTarget.attributes["value"].value;
        this.props.updateTag(tagId);
    };
    IndexListingDisplay.prototype.render = function () {
        return (React.createElement("li", null,
            React.createElement("h4", null, this.props.tag.tagType),
            React.createElement("button", { type: "submit", value: this.props.tag.id, onClick: this.deleteTag.bind(this) }, "Delete"),
            React.createElement("button", { type: "submit", value: this.props.tag.id, onClick: this.editTag.bind(this) }, "Update"),
            React.createElement("a", { href: this.props.tag.url, target: "_blank" }, this.props.tag.siteTitle)));
    };
    return IndexListingDisplay;
}(React.Component));
exports.default = IndexListingDisplay;
//# sourceMappingURL=index-listing-display.js.map