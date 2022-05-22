class ApiFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex : this.queryStr.keyword,
                $options : 'i'
            }
        } : {};
        // console.log("search name keyword: ",keyword);
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryParams = {...this.queryStr};

        const removeFields = ["keyword","page","limit"];

        removeFields.forEach(key => delete queryParams[key]);
        // console.log("filter queryParams: ",queryParams);

        let queryStr = JSON.stringify(queryParams);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(recordsPerPage){
        const pageNumber = Number(this.queryStr.page) || 0;
        this.query = this.query.skip(pageNumber * recordsPerPage).limit(recordsPerPage);
        return this;
    }
}

module.exports = ApiFeatures;