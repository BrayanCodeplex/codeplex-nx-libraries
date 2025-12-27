import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  CodeplexButton,
  CodeplexBadge,
  CodeplexSpinner,
  CodeplexKbd,
  CodeplexSmartLabel,
  CodeplexRating,
  CodeplexInputHelper
} from '@codeplex-qwik/ui';
import { useTheme } from '@codeplex-qwik/theme';
import {
  CodeplexSidebar,
  CodeplexHeader,
  CodeplexFooter,
  CodeplexMenuItem,
  CodeplexBreadcrumb
} from '@codeplex-qwik/layout'; // CodeplexJumbotron remains in UI

// Pages
import { HomePage } from './pages/home/home.page';
import { ButtonPage } from './pages/ui/button/button.page';
import { AlertPage } from './pages/ui/alert/alert.page';
import { BadgePage } from './pages/ui/badge/badge.page';
import { CardPage } from './pages/ui/card/card.page';
import { ProgressPage } from './pages/ui/progress/progress.page';
import { RatingPage } from './pages/ui/rating/rating.page';
import { ToastPage } from './pages/ui/toast/toast.page';
import { TooltipPage } from './pages/ui/tooltip/tooltip.page';
import { SidebarPage } from './pages/layout/sidebar/sidebar.page';
import { AvatarPage } from './pages/ui/avatar/avatar.page';
import { SkeletonPage } from './pages/ui/skeleton/skeleton.page';
import { AutocompletePage } from './pages/ui/autocomplete/autocomplete.page';
import { ButtonGroupPage } from './pages/ui/button-group/button-group.page';
import { CheckboxPage } from './pages/ui/checkbox/checkbox.page';
import { NumberFieldPage } from './pages/ui/number-field/number-field.page';
import { RadioGroupPage } from './pages/ui/radio-group/radio-group.page';
import { SelectPage } from './pages/ui/select/select.page';
import { SliderPage } from './pages/ui/slider/slider.page';
import { SwitchPage } from './pages/ui/switch/switch.page';
import { TextFieldPage } from './pages/ui/text-field/text-field.page';
import { TransferListPage } from './pages/ui/transfer-list/transfer-list.page';


const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="p-2 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-yellow-400"
      onClick={toggleTheme}
      aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
      title={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
      <div className="flex items-center gap-2">
        {theme === 'light' ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </button>
  );
};

// -------------------------------------------------
// MENÚ BASE
// -------------------------------------------------
// Helper to recursively mark active items based on current path
const markActive = (items: CodeplexMenuItem[], currentPath: string): CodeplexMenuItem[] => {
  return items.map(item => ({
    ...item,
    active: item.href === currentPath,
    children: item.children ? markActive(item.children, currentPath) : undefined
  }));
};


const baseMenuItems: CodeplexMenuItem[] = [
  { id: 'home', label: 'Inicio', icon: '🏠', href: '/' },
  {
    id: 'ui',
    label: 'UI',
    icon: '🧩',
    children: [
      { id: 'ui-button', icon: '🔘', label: 'Button', href: '/ui/button' },
      { id: 'ui-alert', icon: '🚨', label: 'Alert', href: '/ui/alert' },
      { id: 'ui-avatar', icon: '👤', label: 'Avatar', href: '/ui/avatar' },
      { id: 'ui-badge', icon: '🏷️', label: 'Badge', href: '/ui/badge' },
      { id: 'ui-card', icon: '🃏', label: 'Card', href: '/ui/card' },
      { id: 'ui-progress', icon: '📈', label: 'Progress', href: '/ui/progress' },
      { id: 'ui-rating', icon: '⭐', label: 'Rating', href: '/ui/rating' },
      { id: 'ui-toast', icon: '🍞', label: 'Toast', href: '/ui/toast' },
      { id: 'ui-tooltip', icon: '💬', label: 'Tooltip', href: '/ui/tooltip' },
      { id: 'ui-skeleton', icon: '💀', label: 'Skeleton', href: '/ui/skeleton' },
      { id: 'ui-autocomplete', icon: '🔍', label: 'Autocomplete', href: '/ui/autocomplete' },
      { id: 'ui-button-group', icon: '🔗', label: 'Button Group', href: '/ui/button-group' },
      { id: 'ui-checkbox', icon: '☑️', label: 'Checkbox', href: '/ui/checkbox' },
      { id: 'ui-number-field', icon: '🔢', label: 'Number Field', href: '/ui/number-field' },
      { id: 'ui-radio-group', icon: '🔘', label: 'Radio Group', href: '/ui/radio-group' },
      { id: 'ui-select', icon: '🔽', label: 'Select', href: '/ui/select' },
      { id: 'ui-slider', icon: '🎚️', label: 'Slider', href: '/ui/slider' },
      { id: 'ui-switch', icon: '🔌', label: 'Switch', href: '/ui/switch' },
      { id: 'ui-text-field', icon: '📝', label: 'Text Field', href: '/ui/text-field' },
      { id: 'ui-transfer-list', icon: '⇆', label: 'Transfer List', href: '/ui/transfer-list' },
    ],
  },
  {
    id: 'layout',
    label: 'Layout',
    icon: '🏗️',
    children: [
      { id: 'layout-sidebar', icon: '📁', label: 'Sidebar', href: '/layout/sidebar' },
    ],
  }
];


// -------------------------------------------------
// APP COMPONENT
// -------------------------------------------------
export function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Calculate active menu items
  const menuItems = markActive(baseMenuItems, location.pathname);

  // Breadcrumbs dynamic calculation (implied for now)
  const breadcrumbs: CodeplexBreadcrumb[] = [
    { label: 'Inicio', href: '/' },
    ...(location.pathname !== '/' ? [{ label: location.pathname.split('/').pop() || 'Page' }] : [])
  ];

  const user = {
    name: 'Demo User',
    email: 'demo@codeplex.com',
    role: 'Desarrollador',
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans text-gray-900 dark:text-gray-100">

      {/* Sidebar - using navigate from Router */}
      <CodeplexSidebar
        items={menuItems}
        user={user}
        logoText="Codeplex"
        collapsed={sidebarCollapsed}
        onToggle={setSidebarCollapsed}
        onNavigate={(href) => navigate(href)}
        onLogout={() => console.log('Logout')}
        autoCloseOnNavigate={true}
      />

      {/* Header */}
      <CodeplexHeader
        title="Codeplex Libraries"
        breadcrumbs={breadcrumbs}
        user={user}
        showSearch={true}
        sidebarCollapsed={sidebarCollapsed}
        onSearch={(q) => console.log('Search', q)}
      >
        <ThemeToggle />
      </CodeplexHeader>

      {/* Main Content */}
      <main className={`
        transition-all duration-300
        pt-20 pb-16
        min-h-screen
        ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}
        px-4 md:px-8
      `}>
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ui/button" element={<ButtonPage />} />
            <Route path="/ui/alert" element={<AlertPage />} />
            <Route path="/ui/avatar" element={<AvatarPage />} />
            <Route path="/ui/badge" element={<BadgePage />} />
            <Route path="/ui/card" element={<CardPage />} />
            <Route path="/ui/progress" element={<ProgressPage />} />
            <Route path="/ui/rating" element={<RatingPage />} />
            <Route path="/ui/toast" element={<ToastPage />} />
            <Route path="/ui/tooltip" element={<TooltipPage />} />
            <Route path="/ui/skeleton" element={<SkeletonPage />} />
            <Route path="/ui/autocomplete" element={<AutocompletePage />} />
            <Route path="/ui/button-group" element={<ButtonGroupPage />} />
            <Route path="/ui/checkbox" element={<CheckboxPage />} />
            <Route path="/ui/number-field" element={<NumberFieldPage />} />
            <Route path="/ui/radio-group" element={<RadioGroupPage />} />
            <Route path="/ui/select" element={<SelectPage />} />
            <Route path="/ui/slider" element={<SliderPage />} />
            <Route path="/ui/switch" element={<SwitchPage />} />
            <Route path="/ui/text-field" element={<TextFieldPage />} />
            <Route path="/ui/transfer-list" element={<TransferListPage />} />
            <Route path="/layout/sidebar" element={<SidebarPage />} />
            {/* Fallback for not implemented pages */}
            <Route path="*" element={
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-400">Página en construcción 🚧</h2>
                <p>La ruta <code>{location.pathname}</code> aún no tiene contenido.</p>
              </div>
            } />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <CodeplexFooter
        copyright="© 2025 Codeplex Libraries. Todos los derechos reservados."
        sidebarCollapsed={sidebarCollapsed}
        links={[
          { label: 'Documentación', href: '#' },
          { label: 'GitHub', href: '#' },
          { label: 'Licencia', href: '#' },
        ]}
      />
    </div>
  );
}

export default App;
