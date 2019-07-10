const router = require('express').Router()
const OSS = require('ali-oss')
const fs = require('fs')
const path = require('path')
const conf = require('../config/alioss/config')
const STS = OSS.STS

router.get('/sts', (req, res) => {
  let policy
  if (conf.PolicyFile) {
    policy = fs
      .readFileSync(
        path.resolve(__dirname, '../config/alioss/', conf.PolicyFile)
      )
      .toString('utf-8')
  }

  const client = new STS({
    accessKeyId: conf.AccessKeyId,
    accessKeySecret: conf.AccessKeySecret
  })

  client
    .assumeRole(conf.RoleArn, policy, conf.TokenExpireTime)
    .then(result => {
      res.json({
        AccessKeyId: result.credentials.AccessKeyId,
        AccessKeySecret: result.credentials.AccessKeySecret,
        SecurityToken: result.credentials.SecurityToken,
        Expiration: result.credentials.Expiration
      })
    })
    .catch(err => {
      console.log(err)
      res.status(400).json(err.message)
    })
})
module.exports = router
