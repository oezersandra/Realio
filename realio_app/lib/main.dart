import 'package:flutter/material.dart';
import 'screens/avatar_editor_screen.dart';

void main() {
  runApp(const RealioApp());
}

class RealioApp extends StatelessWidget {
  const RealioApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Realio',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF6D3DF5)),
        scaffoldBackgroundColor: const Color(0xFFF6F2FF),
        useMaterial3: true,
      ),
      home: const GameShell(),
    );
  }
}

class GameShell extends StatefulWidget {
  const GameShell({super.key});

  @override
  State<GameShell> createState() => _GameShellState();
}

class _GameShellState extends State<GameShell> {
  int _index = 0;

  final List<Widget> _pages = const [
    HomeScreen(),
    MissionsScreen(),
    ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _pages[_index],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _index,
        onDestinationSelected: (i) => setState(() => _index = i),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_outlined), label: 'Start'),
          NavigationDestination(icon: Icon(Icons.check_circle_outline), label: 'Missionen'),
          NavigationDestination(icon: Icon(Icons.person_outline), label: 'Profil'),
        ],
      ),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const Text('Guten Morgen, Lea! ✨', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w700)),
          const SizedBox(height: 14),
          Container(
            decoration: BoxDecoration(
              color: const Color(0xFFECE7FF),
              borderRadius: BorderRadius.circular(22),
            ),
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Level 12', style: TextStyle(fontWeight: FontWeight.w700, color: Color(0xFF6D3DF5))),
                    Text('485 / 800 XP', style: TextStyle(fontWeight: FontWeight.w700)),
                  ],
                ),
                const SizedBox(height: 12),
                SizedBox(
                  height: 180,
                  child: Image.asset('assets/avatar/Avatar 1.png', fit: BoxFit.contain),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class MissionsScreen extends StatelessWidget {
  const MissionsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          Text('Missionen', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w700)),
          SizedBox(height: 16),
          ListTile(title: Text('Level dein Zuhause'), subtitle: Text('+50 XP')),
          ListTile(title: Text('Mini Boss: Workout'), subtitle: Text('+70 XP')),
          ListTile(title: Text('Trinke 2L Wasser'), subtitle: Text('+20 XP')),
        ],
      ),
    );
  }
}

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const Text('Profil', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w700)),
          const SizedBox(height: 12),
          Container(
            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(18)),
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                SizedBox(height: 130, child: Image.asset('assets/avatar/Avatar 1.png', fit: BoxFit.contain)),
                const SizedBox(height: 8),
                const Text('Lea', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700)),
                const Text('Level 12', style: TextStyle(color: Color(0xFF6D3DF5), fontWeight: FontWeight.w700)),
                const SizedBox(height: 12),
                FilledButton.icon(
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(builder: (_) => const AvatarEditorScreen()),
                    );
                  },
                  icon: const Icon(Icons.edit),
                  label: const Text('Avatar bearbeiten'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
