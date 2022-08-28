const generate = () => {
  var fs = require("fs");
  fs.readFile(
    "node_modules/react-native/React/Base/RCTModuleMethod.mm",
    "utf8",
    function (err, data) {
      var result = data.replace(
        `return RCTReadString(input, "__unused") ||`,
        `return RCTReadString(input, "__unused") || RCTReadString(input, "__attribute__((__unused__))") ||`
      );

      fs.writeFile(
        "node_modules/react-native/React/Base/RCTModuleMethod.mm",
        result,
        "utf8",
        function (err) {}
      );
    }
  );
};
generate();
