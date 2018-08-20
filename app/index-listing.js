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
var index_listing_display_1 = require("./index-listing-display");
var IndexListing = /** @class */ (function (_super) {
    __extends(IndexListing, _super);
    function IndexListing(props) {
        return _super.call(this, props) || this;
    }
    IndexListing.prototype.render = function () {
        var _this = this;
        return ((React.createElement("ul", null, this.props.tagList.map(function (item) {
            return React.createElement(index_listing_display_1.default, { updateTag: _this.props.updateTag.bind(_this), tag: item, updateTagList: _this.props.updateTagList.bind(_this) });
        }))));
    };
    return IndexListing;
}(React.Component));
exports.default = IndexListing;
//# sourceMappingURL=index-listing.js.map