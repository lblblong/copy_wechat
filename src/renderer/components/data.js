import constant from '@/constant.js'

export default [
  {
    id: 1,
    type: constant.MSG_TYPE_TEXT,
    from: constant.MSG_FROM_SELF,
    user: {
      avatar: require('@/assets/avatar.jpg')
    },
    data: '辣鸡'
  },
  {
    id: 2,
    type: constant.MSG_TYPE_TRANSFER,
    from: constant.MSG_FROM_SELF,
    user: {
      avatar: require('@/assets/avatar.jpg')
    },
    data: {
      num: '11.50',
      msg: '给你给你',
      type: constant.TRANSFER_PUBLISH
    }
  },
  {
    id: 3,
    type: constant.MSG_TYPE_TRANSFER,
    from: constant.MSG_FROM_OPPOSITE,
    user: {
      avatar: require('@/assets/avatar.jpg')
    },
    data: {
      num: '11.50',
      msg: '给你给你',
      type: constant.TRANSFER_RECEIVE
    }
  },
  {
    id: 4,
    type: constant.MSG_TYPE_TEXT,
    from: constant.MSG_FROM_OPPOSITE,
    user: {
      avatar: require('@/assets/avatar.jpg')
    },
    data: '渣渣，还是黑魔导厉害'
  },
  {
    id: 5,
    type: constant.MSG_TYPE_TRANSFER,
    from: constant.MSG_FROM_OPPOSITE,
    user: {
      avatar: require('@/assets/avatar.jpg')
    },
    data: {
      num: '520.00',
      type: constant.TRANSFER_PUBLISH
    }
  },
  {
    id: 6,
    type: constant.MSG_TYPE_IMG,
    from: constant.MSG_FROM_OPPOSITE,
    user: {
      avatar: require('@/assets/avatar.jpg')
    },
    data: 'http://pic31.photophoto.cn/20140504/0035035504358088_b.jpg'
  },
  {
    id: 7,
    type: constant.MSG_TYPE_IMG,
    from: constant.MSG_FROM_SELF,
    user: {
      avatar: require('@/assets/avatar.jpg')
    },
    data: 'http://pic31.photophoto.cn/20140504/0035035504358088_b.jpg'
  },
  {
    id: 8,
    type: constant.MSG_TYPE_VOICE,
    from: constant.MSG_FROM_SELF,
    user: {
      avatar: require('@/assets/avatar.jpg')
    },
    data: 20
  },
  {
    id: 9,
    type: constant.MSG_TYPE_VOICE,
    from: constant.MSG_FROM_OPPOSITE,
    user: {
      avatar: require('@/assets/avatar.jpg')
    },
    data: 8
  },
  {
    id: 10,
    type: constant.MSG_TYPE_VIDEO,
    from: constant.MSG_FROM_SELF,
    user: {
      avatar: require('@/assets/avatar.jpg')
    },
    data: {
      img: 'http://pic31.photophoto.cn/20140504/0035035504358088_b.jpg',
      len: '00:34'
    }
  }
]
