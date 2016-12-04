/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) JSolisU. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *---------------------------------------------------------------------------------------------- */

'use strict'

var fs = require('fs-plus')
var path = require('path')
var validate = require('validate-npm-package-name')

function findPackage (packageName, packageList) {
  for (var i in packageList) {
    if (packageList[i].refName === packageName) {
      return packageList[i]
    }
  }
  return undefined
}

function getPackages (packagesPath, recurse) {
  var packages = []

  function onFile (source) {
    var packagePath = path.resolve(path.dirname(source))
    var packageName = path.basename(packagePath)

    if (!findPackage(packageName, packages)) {
      var packageInfo = getPackageInfo(packagePath, packageName)
      if (packageInfo) {
        packages.push(packageInfo)
      }
    }
    return true
  }

  if ((typeof recurse === 'undefined') || recurse) {
    fs.traverseTreeSync(packagesPath, onFile, function (path) {
      return true
    })
  } else {
    fs.readdirSync(packagesPath).filter(function (file) {
      var fileWithPath = path.resolve(path.join(packagesPath, file))

      if (fs.statSync(fileWithPath).isDirectory(fileWithPath)) {
        onFile(path.join(fileWithPath, 'dummmy'))
      }
    })
  }

  return packages
}

function getPackageInfo (packagePath, refName) {
  try {
    var packageInfo = JSON.parse(fs.readFileSync(path.join(packagePath, 'package.json'), 'utf8'))
    var packageVersion = packageInfo.version
    var packageName = packageInfo.name
  } catch (error) {
    packageVersion = ''
  }

  if ((packageVersion !== '') && (validate(packageName).validForNewPackages)) {
    return {
      'packageName': packageName,
      'version': packageVersion,
      'packagePath': packagePath,
      'refName': refName ? refName : packageName
    }
  }

  return undefined
}

function getPackageFromPath (packagePath) {
  var currentPath = path.resolve(packagePath)

  do {
    var packageInfo = getPackageInfo(currentPath)
    if (packageInfo) {
      return packageInfo
    }
    currentPath = path.normalize(path.join(currentPath, '..'))
  } while (currentPath !== '.')

  return undefined
}

module.exports = {
  findPackage: findPackage,
  getPackages: getPackages,
  getPackageFromPath: getPackageFromPath,
  getPackageInfo: getPackageInfo
}
