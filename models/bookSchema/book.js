const mongoose = require("mongoose");
const Category = mongoose.model("category");
const Author = mongoose.model("author");
const Publisher = mongoose.model("publisher");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    slug: String,
    description: {
      type: String,
      required: true,
      unique: true
    },
    tags: [Array],
    author: { type: mongoose.Schema.ObjectId, ref: "author", required: true },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
      required: true
    },
    shipping: {
      type: Boolean,
      required: true
    },
    available: {
      type: Boolean,
      required: true
    },
    publisher: {
      type: mongoose.Schema.ObjectId,
      ref: "publisher",
      required: true
    },
    sold: {
      type: Number,
      default: 0
    },
    publish: {
      type: Boolean,
      required: true
    },
    photo: {
      type: Array,
      default: []
    }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//book slug
BookSchema.pre("save", async function(next) {
  if (!this.isModified("title")) {
    next(); // skip it
    return; // stop this function from running
  }
  this.slug = slug(this.title);
  //find other stores that have a slug of bd ,bd-1
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, "i");
  const booksWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (storesWithSlug.length) {
    this.slug = `${this.slug}-${booksWithSlug.length + 1}`;
  }
  next();
});

//list of tag
BookSchema.statics.getTagList = function() {
  return this.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
};

//top 10 books
BookSchema.statics.topbookslist = function() {
  return this.aggregate([
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "book",
        as: "reviews"
      }
    },
    {
      $match: {
        "reviews.1": { $exists: true }
      }
    },
    {
      $project: {
        photo: "$$ROOT.photo",
        title: "$$ROOT.title",
        reviews: "$$ROOT.reviews",
        slug: "$$ROOT.slug",
        averageRating: { $avg: "$reviews.rating" }
      }
    },
    {
      $sort: {
        averageRating: -1
      }
    },
    {
      $limit: 10
    }
  ]);
};
// group by author
BookSchema.statics.categorylist = async function() {
  let author = await this.aggregate([
    {
      $unwind: "$author"
    },
    {
      $group: {
        _id: "$author",
        amount: {
          $sum: 1
        }
      }
    }
  ]).exec();
  if (author) {
    await Author.populate(author, {
      path: "_id"
    });
  }
  return author;
};

// group by category
BookSchema.statics.categorylist = async function() {
  let category = await this.aggregate([
    {
      $unwind: "$category"
    },
    {
      $group: {
        _id: "$brand",
        amount: {
          $sum: 1
        }
      }
    }
  ]).exec();
  if (category) {
    await Category.populate(category, {
      path: "_id"
    });
  }
  return category;
};

// group by publisher
BookSchema.statics.publisherlist = async function() {
  let publisher = await this.aggregate([
    {
      $unwind: "$publisher"
    },
    {
      $group: {
        _id: "$publisher",
        amount: {
          $sum: 1
        }
      }
    }
  ]).exec();
  if (publisher) {
    await Publisher.populate(publisher, {
      path: "_id"
    });
  }
  return publisher;
};

//find review where the stores _id property === reviews store property
BookSchema.virtual("reviews", {
  ref: "review", // what model to link
  localField: "_id", // which field store
  foreignField: "book" // which field review
});

// Define our indexes
BookSchema.index({
  title: "text",
  description: "text"
});

// auto populate
function autopopulate(next) {
  this.populate("reviews categories authors publishers");
  next();
}

BookSchema.pre("find", autopopulate);
BookSchema.pre("findOne", autopopulate);

const Book = mongoose.model("book", BookSchema);
module.exports = Book;
