Array.prototype.paginate = function (query) {
  return this.slice(
    (query.pageNumber - 1) * query.pageSize,
    query.pageNumber * query.pageSize
  );
};

export class PaginationQuery {
  constructor({ pagenumber, pagesize }) {
    if (!pagenumber) pagenumber = 1;
    if (!pagesize) pagesize = -1;
    this.pageNumber = Math.max(1, +pagenumber);
    this.pageSize = +pagesize < 1 ? -1 : +pagesize;
  }
}

export class SearchAndPaginationQuery extends PaginationQuery {
  constructor({ pagenumber, pagesize, search }) {
    super({ pagenumber, pagesize });
    this.search = search?.trim().toLowerCase();
  }
}

export class PaginationModel {
  constructor(data, pageNumber, pageSize, totalCount) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.totalPages =
      pageSize === 0 ? totalCount : Math.ceil(totalCount / pageSize);
    this.hasPreviousPage = pageNumber > 1;
    this.hasNextPage = pageNumber < this.totalPages;
    this.data = data;
  }

  static #create(data, query) {
    const total = data.length;
    if (query.pageSize === -1) query.pageSize = total;
    const pageSize = query.pageSize > total ? total : query.pageSize;
    return new PaginationModel(
      data.paginate(query),
      query.pageNumber,
      pageSize,
      total
    );
  }

  static create(data, query, search) {
    data =
      query.search && search
        ? data.filter((item) => search(item, query.search))
        : data;
    return this.#create(data, query);
  }
}

export default { PaginationQuery, SearchAndPaginationQuery, PaginationModel };
