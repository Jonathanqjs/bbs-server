
class PageModel<T> {
  private row: number
  private total: number
  private data: Array<T>
  private pagingData: Array<Array<T>>
  constructor({ data, row }: { data: Array<T>, row: number }) {
    this.data = data
    this.row = row
    this.total = data.length
    for (let i = 0; i < this.data.length; i += this.row) {
      this.pagingData.push(this.data.slice(i, i + this.row))
    }

  }

  getData(page: number) {   
    return {
      total: this.total,
      currentPage:page,
      data: this.pagingData[page-1]??[]
    }
  }
}