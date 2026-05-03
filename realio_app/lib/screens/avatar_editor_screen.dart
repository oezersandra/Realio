import 'package:flutter/material.dart';

class AvatarEditorScreen extends StatelessWidget {
  const AvatarEditorScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Avatar Editor'),
        backgroundColor: const Color(0xFF6D3DF5),
        foregroundColor: Colors.white,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 280,
              height: 280,
              decoration: BoxDecoration(
                color: const Color(0xFFECE7FF),
                borderRadius: BorderRadius.circular(28),
              ),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Image.asset('assets/avatar/Avatar 1.png', fit: BoxFit.contain),
              ),
            ),
            const SizedBox(height: 18),
            const Text('Dein aktueller Avatar', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
          ],
        ),
      ),
    );
  }
}
