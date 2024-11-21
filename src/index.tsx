import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import './styles/font.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'overlayscrollbars/overlayscrollbars.css';
import 'react-datepicker/dist/react-datepicker.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);
