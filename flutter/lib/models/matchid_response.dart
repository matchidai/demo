import 'dart:convert';

class MatchIDResponse {
  final bool? matchid;
  final String eventName;
  final Map<String, dynamic>? data;

  MatchIDResponse({this.matchid, required this.eventName, this.data});

  factory MatchIDResponse.fromJson(String str) =>
      MatchIDResponse.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory MatchIDResponse.fromMap(Map<String, dynamic> json) => MatchIDResponse(
    matchid: json["matchid"] ?? false,
    eventName: json["eventName"] ?? "",
    data: json["data"] == null ? null : Map<String, dynamic>.from(json["data"]),
  );

  Map<String, dynamic> toMap() => {
    "matchid": matchid,
    "eventName": eventName,
    "data": data,
  };
}
