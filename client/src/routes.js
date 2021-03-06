import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));

const UIBasicButton = React.lazy(() => import('./Demo/UIElements/Basic/Button'));
const Users = React.lazy(() => import('./Demo/Security/Users'));
const Cashiers = React.lazy(() => import('./Demo/Security/Cashiers'));
const Consecutives = React.lazy(() => import('./Demo/Security/Consecutives'));
const Countries = React.lazy(() => import('./Demo/Security/Countries'));
const Roles = React.lazy(() => import('./Demo/Security/Roles'));
const UnitsOfMeasure = React.lazy(() => import('./Demo/Security/UnitsOfMeasure'));
const Restaurants = React.lazy(() => import('./Demo/Restaurants/Restaurants'));
const Home = React.lazy(() => import('./Demo/Restaurants/Home'));
const Buffet = React.lazy(() => import('./Demo/Administration/Buffet'));
const Tables = React.lazy(() => import('./Demo/Administration/Tables'));
const Bars = React.lazy(() => import('./Demo/Administration/Bars'));
const Console = React.lazy(() => import('./Demo/Restaurants/Console'));
const Brands = React.lazy(() => import('./Demo/Providers/Brands'));
const Products = React.lazy(() => import('./Demo/Providers/Products'));
const Help = React.lazy(() => import('./Demo/Help/Help'));
const Providers = React.lazy(() => import('./Demo/Providers/Providers'));
const Clients = React.lazy(() => import('./Demo/Clients/Clients'));
const UIBasicBadges = React.lazy(() => import('./Demo/UIElements/Basic/Badges'));
const UIBasicBreadcrumbPagination = React.lazy(() => import('./Demo/UIElements/Basic/BreadcrumbPagination'));

const UIBasicCollapse = React.lazy(() => import('./Demo/UIElements/Basic/Collapse'));
const UIBasicTabsPills = React.lazy(() => import('./Demo/UIElements/Basic/TabsPills'));
const UIBasicBasicTypography = React.lazy(() => import('./Demo/UIElements/Basic/Typography'));

const FormsElements = React.lazy(() => import('./Demo/Forms/FormsElements'));

const BootstrapTable = React.lazy(() => import('./Demo/Tables/BootstrapTable'));

const Nvd3Chart = React.lazy(() => import('./Demo/Charts/Nvd3Chart/index'));

const GoogleMap = React.lazy(() => import('./Demo/Maps/GoogleMap/index'));

const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const OtherDocs = React.lazy(() => import('./Demo/Other/Docs'));

const routes = [
    { path: '/dashboard/default', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/basic/button', exact: true, name: 'Basic Button', component: UIBasicButton },
    { path: '/basic/badges', exact: true, name: 'Basic Badges', component: UIBasicBadges },
    { path: '/basic/breadcrumb-paging', exact: true, name: 'Basic Breadcrumb Pagination', component: UIBasicBreadcrumbPagination },
    { path: '/basic/collapse', exact: true, name: 'Basic Collapse', component: UIBasicCollapse },
    { path: '/basic/tabs-pills', exact: true, name: 'Basic Tabs & Pills', component: UIBasicTabsPills },
    { path: '/basic/typography', exact: true, name: 'Basic Typography', component: UIBasicBasicTypography },
    { path: '/forms/form-basic', exact: true, name: 'Forms Elements', component: FormsElements },
    { path: '/tables/bootstrap', exact: true, name: 'Bootstrap Table', component: BootstrapTable },
    { path: '/charts/nvd3', exact: true, name: 'Nvd3 Chart', component: Nvd3Chart },
    { path: '/maps/google-map', exact: true, name: 'Google Map', component: GoogleMap },
    { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },
    { path: '/users', exact: true, name: 'Users', component: Users },
    { path: '/consecutives', exact: true, name: 'Consecutives', component: Consecutives },
    { path: '/countries', exact: true, name: 'Countries', component: Countries },
    { path: '/roles', exact: true, name: 'Roles', component: Roles },
    { path: '/restaurants', exact: true, name: 'Restaurants', component: Restaurants },
    { path: '/clients', exact: true, name: 'Clients', component: Clients },
    { path: '/providers', exact: true, name: 'Providers', component: Providers },
    { path: '/brands', exact: true, name: 'Brands', component: Brands },
    { path: '/unitsOfMeasure', exact: true, name: 'UnitsOfMeasure', component: UnitsOfMeasure },
    { path: '/restaurants/home', exact: true, name: 'Home', component: Home },
    { path: '/restaurants/console', exact: true, name: 'Console', component: Console },
    { path: '/administration/buffet', exact: true, name: 'Buffet', component: Buffet },
    { path: '/cashiers', exact: true, name: 'Cashiers', component: Cashiers },
    { path: '/tables', exact: true, name: 'Tables', component: Tables },
    { path: '/bars', exact: true, name: 'Bars', component: Bars },
    { path: '/products', exact: true, name: 'Products', component: Products },
    { path: '/help', exact: true, name: 'Help', component: Help },
];

export default routes;