const router = require('express').Router()
const homeItems = [
  {
    title: '资源',
    items: [
      {
        title: '电子书',
        url: 'library',
        content: '收集的专业的电子书 '
      },
      {
        title: 'kindle',
        url: 'kindle',
        content: '推荐一些喜欢的kindle电子书'
      },
      {
        title: '模板资源',
        url: 'template',
        content: '收集的包括但不限于PPT,简历,论文,模板'
      },
      { title: '***', url: '***', content: '待添加***' }
    ]
  },
  {
    title: '思维题目/游戏',
    items: [
      { title: '逻辑题目', url: 'logic', content: '一些有意思的逻辑题目' },
      { title: '扫雷', url: 'mines', content: '扫雷游戏' },
      {
        title: '数独',
        url: 'sdoku',
        content: `数独游戏,挖洞思想数独生成算法, 每个数独唯一解`
      },
      {
        title: '华容道',
        url: 'klotski',
        content: '华容道-, 提供任意状态的解密流程'
      },
      {
        title: '木块华容道',
        url: 'wood',
        content: '木块华容道-提供任意状态的解密流程'
      },
      {
        title: '数字华容道',
        url: 'klotski3',
        content: '数字华容道-, 提供初始状态解密'
      },
      {
        title: '围住神经猫',
        url: 'cat',
        content: '神经猫-堵住神经猫咪, 实现神经猫的每步最优路径'
      },
      { title: '竹竿游戏', url: 'bamboo', content: '竹竿跳游戏-考验反应力' },
      {
        title: '记忆大师',
        url: 'memory',
        content: '记忆大师 - 考验你的记忆力'
      }
    ]
  },
  {
    title: '爆笑短文',
    items: [
      { title: '笑话', url: 'joke', content: '笑话大全' },
      { title: '幽默', url: 'humor', content: '幽默大全' },
      {
        title: '脑筋急转弯',
        url: 'brain',
        content: '各种脑筋急转弯'
      },
      {
        title: '哲理故事',
        url: 'philosophy',
        content: '哲理小故事'
      }
    ]
  },
  {
    title: '实用工具',
    items: [
      { title: '文章', url: 'article', content: '文章及文章编辑器' },
      { title: '打字', url: 'typing', content: '训练你的打字速度' },
      {
        title: '亲戚计算器',
        url: 'relationship',
        content: '计算你的亲戚朋友关系'
      },
      {
        title: '二维码生成器',
        url: 'qrcode',
        content: '将你的网址生成二维码'
      }
    ]
  }
]
router.get('/getItems', (req, res) => {
  return res.send(homeItems)
})
module.exports = router
