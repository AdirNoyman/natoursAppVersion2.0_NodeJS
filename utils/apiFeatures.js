class APIFeatures {
  // query = mongoose query object
  // queryString = req.query (the query string that comes from the client)
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1) Filtering
    const queryObj = { ...this.queryString };
    const excludeFilelds = ['page', 'sort', 'limit', 'fields'];
    excludeFilelds.forEach((el) => delete queryObj[el]);

    // 2) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // We can't immediately manipualte the query result with sort for example. We first have to await it 🤓 ....and only after we get the documents/results back, we can manipulate it

    this.query = this.query.find(JSON.parse(queryStr));
    // So first we build the query
    // This returns a query result object
    // let query = Tour.find(JSON.parse(queryStr));

    // return the entire object (instance of APIFeatures class)
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    // return the entire object (instance of APIFeatures class)
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      // Excluding fields with '-'
      this.query = this.query.select('-__v');
    }

    // return the entire object (instance of APIFeatures class)
    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page) || 1;
    const maxResultsPerPage = parseInt(this.queryString.limit) || 100;
    const numResultsSkip = (page - 1) * maxResultsPerPage;
    this.query = this.query.skip(numResultsSkip).limit(maxResultsPerPage);

    // return the entire object (instance of APIFeatures class)
    return this;
  }
}

module.exports = APIFeatures;
