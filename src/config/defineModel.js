const defaultModel = {
    date: { type: Date },
    string: { type: String, default: "" },
    stringR: { type: String, required: true },
    stringRef: { type: String, required: true, match: /^[a-fA-F0-9]{24}$/ },
    stringPhone: { type: String, default: "", match: /^0\d{9}$/ },
    stringUnique: { type: String, required: true, unique: true },
    array: { type: Array, default: [] },
    number: { type: Number, default: 0 },
    boolean: { type: Boolean, default: true },
    booleanFalse: { type: Boolean, default: false },
    object: { type: Object, default: {} },
    stringImage: { type: String, default: "https://firebasestorage.googleapis.com/v0/b/travel-app-34be2.appspot.com/o/unknown.jpg?alt=media&token=3dbbbcec-60e1-419b-89b8-cedb9d7f0514" },
};
const defaultRoles = {
    User: 0,
    Admin: 1,
}

module.exports = {
    defaultRoles,
    defaultModel
}