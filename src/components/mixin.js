export default {
  data () {
    return {
      // 卡片--标题
      cardTitle: '',
      // 卡片--副标题
      cardSubTitle: '',
      // 卡片--数据接口地址
      apiUrl: '',
    }
  },
  methods: {
    // 拿当前路由动态匹配出store中params参数pageType
    matchParmsPageType () {
      return new Promise((resolve, reject) => {
        let _arr = this.$store.state.floatMenus.floatMenus
        const _curPath = this.getCurrentPath()
        _arr.find((val, index) => {
          if (val.pageCode == _curPath) {
            const _res = val.cartList.find(v => v.cardCode === this.$options.name)
            this.cardSubTitle = _res.subTitle
            this.cardTitle = _res.title
            this.apiUrl = _res.url
            resolve(_res.params.cardCode)
          }
        })
        
      })
    },
  }
}