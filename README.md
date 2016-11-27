# pkg-helper
Package helper for npm

##Using

```
npm install pkg-helper
```

##Documentation

### `findPackage(packageName, packageList)`
Returns an object **{packageName, version, packagePath, refName}** if **packageName** is on **packageList**.

### `getPackages(packagesPath)`
Returns a **packageList** array containing **{packageName, version, packagePath, refName}** for each package found on **packagesPath**.

### `getPackageInfo(packagesPath, [refName])`
Returns an object **{packageName, version, packagePath, refName}** if **packageName** contains a valid package. **refName** is optional and used for package location only when used on **findPackage**.

### `getPackageFromPath(packagePath)`
Return an object **{packageName, version, packagePath, refName}** if **packagesPath** contains a valid package on its directory hierarchy.
