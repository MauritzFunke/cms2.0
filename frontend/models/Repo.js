"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var mongoose = require("mongoose");
var RepoSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    html_url: { type: String, required: true },
    description: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    language: { type: String, required: true }
});
exports["default"] = mongoose.model('Repo', RepoSchema);
