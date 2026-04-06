const fs = require('fs');
const dts = fs.readFileSync('/workspace/TaskFlow/node_modules/lucide-react-native/dist/lucide-react-native.d.ts', 'utf8');

const icons = [
  'CircleCheck', 'Circle', 'MoreVertical', 'Briefcase', 'User', 'BookOpen', 'PenTool', 'Heart', 
  'Home', 'Calendar', 'PieChart', 'Plus', 'Bell', 'LogOut', 'ChevronRight', 'Star', 'ChevronLeft', 'Trash2'
];

icons.forEach(icon => {
  if (!dts.includes(icon + ',')) {
    console.log("MIGHT BE MISSING:", icon);
  }
});
