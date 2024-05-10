import 'package:cli/cli.dart' as cli;


void main() async {
  var stream = cli.countStream(10);
  var sum = await cli.sumStream(stream);
  print(sum); // 55
}
