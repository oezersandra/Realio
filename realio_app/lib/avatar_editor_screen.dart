import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AvatarEditorScreen extends StatefulWidget {
  @override
  _AvatarEditorScreenState createState() => _AvatarEditorScreenState();
}

class _AvatarEditorScreenState extends State<AvatarEditorScreen> {
  String selectedHair = 'hair_1.png';
  String selectedShirt = 'shirt_1.png';

  final List<String> hairs = [
    'hair_1.png',
    'hair_2.png',
    'hair_3.png',
    'hair_4.png',
  ];

  final List<String> shirts = [
    'shirt_1.png',
    'shirt_2.png',
    'shirt_3.png',
    'shirt_4.png',
  ];

  @override
  void initState() {
    super.initState();
    loadAvatar();
  }

  Future<void> loadAvatar() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      selectedHair = prefs.getString('hair') ?? 'hair_1.png';
      selectedShirt = prefs.getString('shirt') ?? 'shirt_1.png';
    });
  }

  Future<void> saveAvatar() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('hair', selectedHair);
    await prefs.setString('shirt', selectedShirt);
  }

  Widget buildAvatar() {
    return Stack(
      alignment: Alignment.center,
      children: [
        Image.asset('assets/avatar/body.png', width: 180),
        Image.asset('assets/avatar/$selectedShirt', width: 180),
        Image.asset('assets/avatar/eyes.png', width: 180),
        Image.asset('assets/avatar/mouth_smile.png', width: 180),
        Image.asset('assets/avatar/$selectedHair', width: 180),
      ],
    );
  }

  Widget buildSelector(List<String> items, String type) {
    return SizedBox(
      height: 100,
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: items.map((item) {
          return GestureDetector(
            onTap: () {
              setState(() {
                if (type == 'hair') {
                  selectedHair = item;
                } else {
                  selectedShirt = item;
                }
              });
              saveAvatar();
            },
            child: Container(
              margin: EdgeInsets.all(8),
              padding: EdgeInsets.all(6),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.purple, width: 2),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Image.asset(
                'assets/avatar/$item',
                width: 60,
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Avatar Editor"),
        backgroundColor: Colors.purple,
      ),
      body: Column(
        children: [
          SizedBox(height: 20),

          // Avatar Preview
          buildAvatar(),

          SizedBox(height: 30),

          // Hair Selector
          Text("Haare auswählen", style: TextStyle(fontSize: 18)),
          buildSelector(hairs, 'hair'),

          SizedBox(height: 20),

          // Shirt Selector
          Text("Outfit auswählen", style: TextStyle(fontSize: 18)),
          buildSelector(shirts, 'shirt'),

          SizedBox(height: 20),

          ElevatedButton(
            onPressed: () {
              saveAvatar();
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text("Avatar gespeichert!")),
              );
            },
            child: Text("Speichern"),
          )
        ],
      ),
    );
  }
}