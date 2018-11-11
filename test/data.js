[
  {
    id: 0,
    type: constant.MSG_TYPE_TRANSFER,
    from: constant.MSG_FROM_OPPOSITE,
    data: {
      num: '11.50',
      msg: '给你给你',
      type: constant.TRANSFER_RECEIVE
    }
  },
  {
    id: 1,
    type: constant.MSG_TYPE_TEXT,
    from: constant.MSG_FROM_OPPOSITE,
    data: '渣渣，还是黑魔导厉害'
  },
  {
    id: 2,
    type: constant.MSG_TYPE_TRANSFER,
    from: constant.MSG_FROM_OPPOSITE,
    data: {
      num: '520.00',
      type: constant.TRANSFER_PUBLISH
    }
  },
  {
    id: 3,
    type: constant.MSG_TYPE_IMG,
    from: constant.MSG_FROM_OPPOSITE,
    data: 'http://pic31.photophoto.cn/20140504/0035035504358088_b.jpg'
  },
  {
    id: 4,
    type: constant.MSG_TYPE_IMG,
    from: constant.MSG_FROM_SELF,
    data: 'http://pic31.photophoto.cn/20140504/0035035504358088_b.jpg'
  },
  {
    id: 5,
    type: constant.MSG_TYPE_VOICE,
    from: constant.MSG_FROM_SELF,
    data: 20
  },
  {
    id: 6,
    type: constant.MSG_TYPE_VOICE,
    from: constant.MSG_FROM_OPPOSITE,
    data: 8
  },
  {
    id: 7,
    type: constant.MSG_TYPE_VIDEO,
    from: constant.MSG_FROM_SELF,
    data: {
      img: 'http://pic31.photophoto.cn/20140504/0035035504358088_b.jpg',
      len: '00:34'
    }
  },
  {
    id: 8,
    type: constant.MSG_TYPE_FILE,
    from: constant.MSG_FROM_SELF,
    data: {
      file_type: constant.FILE_TYPE_EXCEL,
      name: '工作表1.xls',
      size: '26kb'
    }
  },
  {
    id: 9,
    type: constant.MSG_TYPE_FILE,
    from: constant.MSG_FROM_OPPOSITE,
    data: {
      file_type: constant.FILE_TYPE_WORD,
      name: '新建文本文档.doc',
      size: '26kb'
    }
  },
  {
    id: 10,
    from: constant.MSG_FROM_SYSTEM,
    data: '9:18'
  },
  {
    id: 11,
    from: constant.MSG_FROM_SYSTEM,
    data: '昨天 20:25'
  }
]