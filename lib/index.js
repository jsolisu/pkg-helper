/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) JSolisU. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *---------------------------------------------------------------------------------------------- */

'use strict'

var fs = require('fs-plus')
var path = require('path')

function findPackage (packageName, packageList) {
  for (var i in packageList) {
    if (packageList[i].packageName === packageName) {
      return packageList[i]
    }
  }
  return undefined
}

function getPackages (packagesPath) {
  var packages = []

  function onFile (source) {
    var packagePath = path.dirname(source)
    var packageName = path.basename(packagePath)

    if (packageName === '.') return

    if (!findPackage(packageName, packages) && fs.existsSync(path.join(packagePath, 'package.json'))) {
      try {
        var packageVersion = JSON.parse(fs.readFileSync(path.join(packagePath, 'package.json'), 'utf8')).version
      } catch (error) {
        packageVersion = ''
      }

      if (packageVersion !== '') {
        packages.push({
          'packageName': packageName,
          'version': packageVersion,
          'packagePath': packagePath
        })
      }
    }
    return true
  }

  fs.traverseTreeSync(packagesPath, onFile, function (path) {
    return true
  })

  return packages
}

module.exports = {
  findPackage: findPackage,
  getPackages: getPackages
}
