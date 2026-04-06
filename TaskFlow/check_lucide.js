const lucide = require('lucide-react-native');
const icons = ['CheckCircle2', 'Circle', 'MoreVertical', 'Briefcase', 'User', 'BookOpen', 'PenTool', 'Heart', 'Home', 'Calendar', 'PieChart', 'Plus', 'Bell', 'LogOut', 'ChevronRight', 'Star', 'ChevronLeft', 'Trash2'];
icons.forEach(icon => {
  if (!lucide[icon]) console.log(`Missing: ${icon}`);
});
