db = db.getSiblingDB('cqrs_read');

db.createCollection('users');

console.log("MongoDB initialization script executed.");