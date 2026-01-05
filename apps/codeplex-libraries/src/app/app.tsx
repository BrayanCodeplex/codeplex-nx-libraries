import { useState, useMemo } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  CodeplexBoton,
  CodeplexInsignia,
  CodeplexCargando,
  CodeplexTeclado,
  CodeplexEtiquetaInteligente,
  CodeplexValoracion,
  CodeplexAyudaEntrada,
  // CodeplexJumbotron remains undefined in prompt/UI list, checking later if needed or remove utils
} from '@codeplex-sac/ui';
import { usarTema } from '@codeplex-sac/theme';
import {
  CodeplexBarraLateral,
  CodeplexCabecera,
  CodeplexPiePagina,
  CodeplexElementoMenuLateral,
  CodeplexElementoMigaPan
} from '@codeplex-sac/layout';
import { ThemeProvider, createTheme, CssBaseline, PaletteMode } from '@mui/material';

// CodeplexProveedorFechas is now from @codeplex-sac/date-pickers (verified in task.md)
import { CodeplexProveedorFechas } from '@codeplex-sac/date-pickers';

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

// Utils Pages
import { ModalPage } from './pages/utils/modal/modal.page';
import { PopoverPage } from './pages/utils/popover/popover.page';
import { PopperPage } from './pages/utils/popper/popper.page';
import { PortalPage } from './pages/utils/portal/portal.page';
import { ClickAwayPage } from './pages/utils/click-away/click-away.page';
import { TextareaPage } from './pages/utils/textarea-autosize/textarea-autosize.page';
import { TransitionsPage } from './pages/utils/transitions/transitions.page';

// Navigation Pages (imports unchanged, assuming files exist and export default or named)
import { BottomNavigationPage } from './pages/navigation/navegacion-inferior/navegacion-inferior.page';
import { BreadcrumbsPage } from './pages/navigation/migas-pan/migas-pan.page';
import { DrawerPage } from './pages/navigation/cajon-lateral/cajon-lateral.page';
import { MenuPage } from './pages/navigation/menu/menu.page';
import { LinkPage } from './pages/navigation/enlace/enlace.page';
import { PaginationPage } from './pages/navigation/paginacion/paginacion.page';
import { SpeedDialPage } from './pages/navigation/marcacion-rapida/marcacion-rapida.page';
import { StepperPage } from './pages/navigation/pasos/pasos.page';
import { TabsPage } from './pages/navigation/pestanas/pestanas.page';

// Date Pickers Pages
import { DatePickerPage } from './pages/date-pickers/selector-fecha/selector-fecha.page';
import { TimePickerPage } from './pages/date-pickers/selector-hora/selector-hora.page';
import { DateTimePickerPage } from './pages/date-pickers/selector-fecha-hora/selector-fecha-hora.page';
import { DigitalClockPage } from './pages/date-pickers/reloj-digital/reloj-digital.page';

// MUI X Pages
import { DataGridPage } from './pages/mui-x/data-grid/data-grid.page';
import { ChartsPage } from './pages/mui-x/charts/charts.page';

// Demos
import { AdvancedCrudPage } from './pages/demos/crud/advanced-crud.page';
import { BillingPage } from './pages/demos/billing/billing.page';
import { EmployeeCrudPage } from './pages/demos/employee-crud/employee-crud.page';
import { SidebarPage } from './pages/layout/barra-lateral/barra-lateral.page';
import { TablePage } from './pages/data-view/tabla/tabla.page';
import { BoxPage } from './pages/layout/caja/caja.page';
import { StackPage } from './pages/layout/pila/pila.page';
import { GridPage } from './pages/layout/cuadricula/cuadricula.page';
import { ContainerPage } from './pages/layout/contenedor/contenedor.page';
import { ImageListPage } from './pages/layout/lista-imagenes/lista-imagenes.page';



const ThemeToggle = () => {
  const { tema, alternarTema } = usarTema();

  return (
    <button
      type="button"
      className="p-2 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-yellow-400"
      onClick={alternarTema}
      aria-label={`Cambiar a modo ${tema === 'light' ? 'oscuro' : 'claro'}`}
      title={`Cambiar a modo ${tema === 'light' ? 'oscuro' : 'claro'}`}
    >
      <div className="flex items-center gap-2">
        {tema === 'light' ? (
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
const markActive = (items: CodeplexElementoMenuLateral[], currentPath: string): CodeplexElementoMenuLateral[] => {
  return items.map(item => ({
    ...item,
    activo: item.href === currentPath,
    hijos: item.hijos ? markActive(item.hijos, currentPath) : undefined
  }));
};


const baseMenuItems: CodeplexElementoMenuLateral[] = [
  { id: 'home', etiqueta: 'Inicio', icono: '🏠', href: '/' },
  {
    id: 'ui',
    etiqueta: 'UI',
    icono: '🧩',
    hijos: [
      { id: 'ui-button', icono: '🔘', etiqueta: 'Botón', href: '/ui/button' },
      { id: 'ui-alert', icono: '🚨', etiqueta: 'Alerta', href: '/ui/alert' },
      { id: 'ui-avatar', icono: '👤', etiqueta: 'Avatar', href: '/ui/avatar' },
      { id: 'ui-badge', icono: '🏷️', etiqueta: 'Insignia', href: '/ui/badge' },
      { id: 'ui-card', icono: '🃏', etiqueta: 'Tarjeta', href: '/ui/card' },
      { id: 'ui-progress', icono: '📈', etiqueta: 'Progreso', href: '/ui/progress' },
      { id: 'ui-rating', icono: '⭐', etiqueta: 'Valoración', href: '/ui/rating' },
      { id: 'ui-toast', icono: '🍞', etiqueta: 'Notificación', href: '/ui/toast' },
      { id: 'ui-tooltip', icono: '💬', etiqueta: 'Tooltip', href: '/ui/tooltip' },
      { id: 'ui-skeleton', icono: '💀', etiqueta: 'Esqueleto', href: '/ui/skeleton' },
      { id: 'ui-autocomplete', icono: '🔍', etiqueta: 'Autocompletado', href: '/ui/autocomplete' },
      { id: 'ui-button-group', icono: '🔗', etiqueta: 'Grupo Botones', href: '/ui/button-group' },
      { id: 'ui-checkbox', icono: '☑️', etiqueta: 'Casilla', href: '/ui/checkbox' },
      { id: 'ui-number-field', icono: '🔢', etiqueta: 'Campo Numérico', href: '/ui/number-field' },
      { id: 'ui-radio-group', icono: '🔘', etiqueta: 'Grupo Radio', href: '/ui/radio-group' },
      { id: 'ui-select', icono: '🔽', etiqueta: 'Selector', href: '/ui/select' },
      { id: 'ui-slider', icono: '🎚️', etiqueta: 'Deslizador', href: '/ui/slider' },
      { id: 'ui-switch', icono: '🔌', etiqueta: 'Interruptor', href: '/ui/switch' },
      { id: 'ui-text-field', icono: '📝', etiqueta: 'Campo Texto', href: '/ui/text-field' },
      { id: 'ui-transfer-list', icono: '⇆', etiqueta: 'Lista Transf.', href: '/ui/transfer-list' },
    ],
  },
  {
    id: 'data-view',
    etiqueta: 'Vista de Datos',
    icono: '📊',
    hijos: [
      { id: 'data-table', icono: '📅', etiqueta: 'Tabla (MRT)', href: '/data-view/table' },
    ],
  },
  {
    id: 'layout',
    etiqueta: 'Diseño',
    icono: '🏗️',
    hijos: [
      { id: 'layout-sidebar', icono: '📁', etiqueta: 'Barra Lateral', href: '/layout/sidebar' },
      { id: 'layout-box', icono: '📦', etiqueta: 'Caja', href: '/layout/box' },
      { id: 'layout-stack', icono: '📚', etiqueta: 'Pila', href: '/layout/stack' },
      { id: 'layout-grid', icono: '▦', etiqueta: 'Cuadrícula', href: '/layout/grid' },
      { id: 'layout-container', icono: '🖼️', etiqueta: 'Contenedor', href: '/layout/container' },
      { id: 'layout-image-list', icono: '📸', etiqueta: 'Lista Imágenes', href: '/layout/image-list' },
    ],
  },
  {
    id: 'utils',
    etiqueta: 'Utilidades',
    icono: '🛠️',
    hijos: [
      { id: 'utils-modal', icono: '🪟', etiqueta: 'Modal', href: '/utils/modal' },
      { id: 'utils-popover', icono: '💬', etiqueta: 'Popover', href: '/utils/popover' },
      { id: 'utils-popper', icono: '📌', etiqueta: 'Popper', href: '/utils/popper' },
      { id: 'utils-portal', icono: '🚪', etiqueta: 'Portal', href: '/utils/portal' },
      { id: 'utils-click-away', icono: '👆', etiqueta: 'Click Fuera', href: '/utils/click-away' },
      { id: 'utils-textarea', icono: '📝', etiqueta: 'Area Texto', href: '/utils/textarea' },
      { id: 'utils-transitions', icono: '✨', etiqueta: 'Transiciones', href: '/utils/transitions' },
    ],
  },
  {
    id: 'navigation',
    etiqueta: 'Navegación',
    icono: '🧭',
    hijos: [
      { id: 'nav-bottom', icono: '⬇️', etiqueta: 'Nav. Inferior', href: '/navigation/bottom-nav' },
      { id: 'nav-breadcrumbs', icono: '🍞', etiqueta: 'Migas Pan', href: '/navigation/breadcrumbs' },
      { id: 'nav-drawer', icono: '🗄️', etiqueta: 'Cajón Lateral', href: '/navigation/drawer' },
      { id: 'nav-menu', icono: '🍔', etiqueta: 'Menú', href: '/navigation/menu' },
      { id: 'nav-link', icono: '🔗', etiqueta: 'Enlace', href: '/navigation/link' },
      { id: 'nav-pagination', icono: '📄', etiqueta: 'Paginación', href: '/navigation/pagination' },
      { id: 'nav-speed-dial', icono: '⚡', etiqueta: 'Marc. Rápida', href: '/navigation/speed-dial' },
      { id: 'nav-stepper', icono: '👣', etiqueta: 'Pasos', href: '/navigation/stepper' },
      { id: 'nav-tabs', icono: '📑', etiqueta: 'Pestañas', href: '/navigation/tabs' },
    ],
  },
  {
    id: 'date-pickers',
    etiqueta: 'Fechas',
    icono: '📅',
    hijos: [
      { id: 'dp-date', icono: '📆', etiqueta: 'Fecha', href: '/date-pickers/date' },
      { id: 'dp-time', icono: '⏰', etiqueta: 'Hora', href: '/date-pickers/time' },
      { id: 'dp-datetime', icono: '🗓️', etiqueta: 'Fecha y Hora', href: '/date-pickers/datetime' },
      { id: 'dp-clock', icono: '🕰️', etiqueta: 'Reloj Digital', href: '/date-pickers/clock' },
    ],
  },
  {
    id: 'mui-x',
    etiqueta: 'MUI X',
    icono: '⚡',
    hijos: [
      { id: 'muix-datagrid', icono: '▦', etiqueta: 'Data Grid', href: '/mui-x/data-grid' },
      { id: 'muix-charts', icono: '📈', etiqueta: 'Gráficos', href: '/mui-x/charts' },
    ],
  },
  {
    id: 'demos',
    etiqueta: 'Demos Reales',
    icono: '🚀',
    hijos: [
      { id: 'demo-crud', icono: '📝', etiqueta: 'CRUD Completo', href: '/demos/crud' },
      { id: 'demo-employee', icono: '👥', etiqueta: 'CRUD Empleados', href: '/demos/employee-crud' },
      { id: 'demo-billing', icono: '🧾', etiqueta: 'Facturación', href: '/demos/billing' },
    ],
  }
];


// -------------------------------------------------
// APP COMPONENT
// -------------------------------------------------

// Internal component to bridge CodeplexTheme -> MUI Theme
const MuiThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { tema } = usarTema();

  const muiTheme = useMemo(() => createTheme({
    palette: {
      mode: tema as PaletteMode,
      primary: {
        main: '#3b82f6', // blue-500 matching Tailwind
      },
      // Optional: customize other colors to match Tailwind config
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none', // clean look for dark mode
          }
        }
      }
    }
  }), [tema]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Calculate active menu items
  const menuItems = markActive(baseMenuItems, location.pathname);

  // Breadcrumbs dynamic calculation (implied for now)
  const migasPan: CodeplexElementoMigaPan[] = [
    { etiqueta: 'Inicio', href: '/' },
    ...(location.pathname !== '/' ? [{ etiqueta: location.pathname.split('/').pop() || 'Página' }] : [])
  ];

  const user = {
    nombre: 'Demo User',
    email: 'demo@codeplex.com',
    rol: 'Desarrollador',
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans text-gray-900 dark:text-gray-100">
      <MuiThemeWrapper>
        <CodeplexProveedorFechas>

          {/* Sidebar - using navigate from Router */}
          <CodeplexBarraLateral
            elementos={menuItems}
            usuario={user}
            textoLogo="Codeplex"
            colapsado={sidebarCollapsed}
            alAlternar={setSidebarCollapsed}
            alNavegar={(href) => navigate(href)}
            alCerrarSesion={() => console.log('Cerrar Sesión')}
            cerrarAlNavegar={true}
          />

          {/* Header */}
          <CodeplexCabecera
            titulo="Codeplex Libraries"
            migasPan={migasPan}
            usuario={user}
            mostrarBusqueda={true}
            barraLateralColapsada={sidebarCollapsed}
            alBuscar={(q) => console.log('Buscar', q)}
          >
            <ThemeToggle />
          </CodeplexCabecera>

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
                <Route path="/data-view/table" element={<TablePage />} />

                {/* Layout */}
                <Route path="/layout/box" element={<BoxPage />} />
                <Route path="/layout/stack" element={<StackPage />} />
                <Route path="/layout/grid" element={<GridPage />} />
                <Route path="/layout/container" element={<ContainerPage />} />
                <Route path="/layout/image-list" element={<ImageListPage />} />

                {/* Utils */}
                <Route path="/utils/modal" element={<ModalPage />} />
                <Route path="/utils/popover" element={<PopoverPage />} />
                <Route path="/utils/popper" element={<PopperPage />} />
                <Route path="/utils/portal" element={<PortalPage />} />
                <Route path="/utils/click-away" element={<ClickAwayPage />} />
                <Route path="/utils/textarea" element={<TextareaPage />} />
                <Route path="/utils/transitions" element={<TransitionsPage />} />

                {/* Navigation */}
                <Route path="/navigation/bottom-nav" element={<BottomNavigationPage />} />
                <Route path="/navigation/breadcrumbs" element={<BreadcrumbsPage />} />
                <Route path="/navigation/drawer" element={<DrawerPage />} />
                <Route path="/navigation/menu" element={<MenuPage />} />
                <Route path="/navigation/link" element={<LinkPage />} />
                <Route path="/navigation/pagination" element={<PaginationPage />} />
                <Route path="/navigation/speed-dial" element={<SpeedDialPage />} />
                <Route path="/navigation/stepper" element={<StepperPage />} />
                <Route path="/navigation/tabs" element={<TabsPage />} />

                {/* Date Pickers */}
                <Route path="/date-pickers/date" element={<DatePickerPage />} />
                <Route path="/date-pickers/time" element={<TimePickerPage />} />
                <Route path="/date-pickers/datetime" element={<DateTimePickerPage />} />
                <Route path="/date-pickers/clock" element={<DigitalClockPage />} />

                {/* MUI X */}
                <Route path="/mui-x/data-grid" element={<DataGridPage />} />
                <Route path="/mui-x/charts" element={<ChartsPage />} />

                {/* Demos */}
                <Route path="/demos/crud" element={<AdvancedCrudPage />} />
                <Route path="/demos/employee-crud" element={<EmployeeCrudPage />} />
                <Route path="/demos/billing" element={<BillingPage />} />

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
          <CodeplexPiePagina
            derechosAutor="© 2025 Codeplex Libraries. Todos los derechos reservados."
            barraLateralColapsada={sidebarCollapsed}
            enlaces={[
              { etiqueta: 'Documentación', href: '#' },
              { etiqueta: 'GitHub', href: '#' },
              { etiqueta: 'Licencia', href: '#' },
            ]}
          />
        </CodeplexProveedorFechas>
      </MuiThemeWrapper>
    </div>
  );
}

export default App;
