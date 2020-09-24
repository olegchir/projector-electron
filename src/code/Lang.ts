export class Lang {
  public static getMethods(obj: any) {
    var result = [];
    for (var id in obj) {
      try {
        if (typeof(obj[id]) == "function") {
          result.push(id + ": " + obj[id].toString());
        }
      } catch (err) {
        result.push(id + ": inaccessible");
      }
    }
    return result;
  }

  public static logMethods(obj: any) {
    console.log(Lang.getMethods(obj).join("\n"));
  }

}
