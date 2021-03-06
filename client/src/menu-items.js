export default {
    items: [
        {
            id: 'navigation',
            title: 'Navegación Principal',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Inicio',
                    type: 'item',
                    url: '/dashboard/default',
                    icon: 'feather icon-home',
                }
            ]
        },
        {
            id: 'ui-element',
            title: 'MODULOS',
            type: 'group',
            icon: 'icon-ui',
            children: [
                // {
                //     id: 'basic',
                //     title: 'Component',
                //     type: 'collapse',
                //     icon: 'feather icon-box',
                //     children: [
                //         {
                //             id: 'button',
                //             title: 'Button',
                //             type: 'item',
                //             url: '/basic/button'
                //         },
                //         {
                //             id: 'badges',
                //             title: 'Badges',
                //             type: 'item',
                //             url: '/basic/badges'
                //         },
                //         {
                //             id: 'breadcrumb-pagination',
                //             title: 'Breadcrumb & Pagination',
                //             type: 'item',
                //             url: '/basic/breadcrumb-paging'
                //         },
                //         {
                //             id: 'collapse',
                //             title: 'Collapse',
                //             type: 'item',
                //             url: '/basic/collapse'
                //         },
                //         {
                //             id: 'tabs-pills',
                //             title: 'Tabs & Pills',
                //             type: 'item',
                //             url: '/basic/tabs-pills'
                //         },
                //         {
                //             id: 'typography',
                //             title: 'Typography',
                //             type: 'item',
                //             url: '/basic/typography'
                //         }
                //     ]
                // },
                {
                    id: 'basic1',
                    title: 'Seguridad',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'button',
                            title: 'Usuarios',
                            type: 'item',
                            url: '/users'
                        },
                        {
                            id: 'badges',
                            title: 'Roles',
                            type: 'item',
                            url: '/roles'
                        },
                        {
                            id: 'breadcrumb-pagination',
                            title: 'Consecutivos',
                            type: 'item',
                            url: '/consecutives'
                        },
                        {
                            id: 'collapse',
                            title: 'Países',
                            type: 'item',
                            url: '/countries'
                        },
                        {
                            id: 'tabs-pills',
                            title: 'Unidades de Medida',
                            type: 'item',
                            url: '/unitsOfMeasure'
                        },
                        {
                            id: 'typography',
                            title: 'Administración de Cajas',
                            type: 'item',
                            url: '/cashiers'
                        }
                    ]
                },
                {
                    id: 'basic2',
                    title: 'Restaurantes',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'button',
                            title: 'Principal',
                            type: 'item',
                            url: '/restaurants/home'
                        },
                        {
                            id: 'button',
                            title: 'Lista de Restaurantes',
                            type: 'item',
                            url: '/restaurants'
                        }
                    ]
                },
                {
                    id: 'basic3',
                    title: 'Clientes',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'button',
                            title: 'Manejo de clientes',
                            type: 'item',
                            url: '/clients'
                        },
                        // {
                        //     id: 'badges',
                        //     title: 'Roles',
                        //     type: 'item',
                        //     url: '/basic/badges'
                        // },
                        // {
                        //     id: 'breadcrumb-pagination',
                        //     title: 'Consecutivos',
                        //     type: 'item',
                        //     url: '/consecutives'
                        // },
                        // {
                        //     id: 'collapse',
                        //     title: 'Países',
                        //     type: 'item',
                        //     url: '/countries'
                        // },
                        // {
                        //     id: 'tabs-pills',
                        //     title: 'Unidades de Medida',
                        //     type: 'item',
                        //     url: '/basic/tabs-pills'
                        // },
                        // {
                        //     id: 'typography',
                        //     title: 'Países',
                        //     type: 'item',
                        //     url: '/basic/typography'
                        // }
                    ]
                },
                {
                    id: 'basic4',
                    title: 'Proveedores',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'button',
                            title: 'Marcas',
                            type: 'item',
                            url: '/brands'
                        },
                        {
                            id: 'badges',
                            title: 'Productos',
                            type: 'item',
                            url: '/products'
                        },
                        {
                            id: 'breadcrumb-pagination',
                            title: 'Proveedores',
                            type: 'item',
                            url: '/providers'
                        },
                        // {
                        //     id: 'collapse',
                        //     title: 'Países',
                        //     type: 'item',
                        //     url: '/countries'
                        // },
                        // {
                        //     id: 'tabs-pills',
                        //     title: 'Unidades de Medida',
                        //     type: 'item',
                        //     url: '/basic/tabs-pills'
                        // },
                        // {
                        //     id: 'typography',
                        //     title: 'Países',
                        //     type: 'item',
                        //     url: '/basic/typography'
                        // }
                    ]
                },
                {
                    id: 'basic5',
                    title: 'Administración',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'button',
                            title: 'Buffet',
                            type: 'item',
                            url: '/administration/buffet'
                        },
                        {
                            id: 'badges',
                            title: 'Mesas',
                            type: 'item',
                            url: '/tables'
                        },
                        {
                            id: 'badges',
                            title: 'Barras',
                            type: 'item',
                            url: '/bars'
                        },
                    ]
                },
                {
                    id: 'basic6',
                    title: 'Reportes',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'button',
                            title: 'Facturación',
                            type: 'item',
                            url: '/cashiers'
                        },
                        {
                            id: 'badges',
                            title: 'Clientes',
                            type: 'item',
                            url: '/clients'
                        }
                    ]
                },
                {
                    id: 'basic7',
                    title: 'Ayuda',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'button',
                            title: 'Módulo de ayuda',
                            type: 'item',
                            url: '/help'
                        }
                    ]
                }


            ]
        },
        // {
        //     id: 'ui-forms',
        //     title: 'Forms & Tables',
        //     type: 'group',
        //     icon: 'icon-group',
        //     children: [
        //         {
        //             id: 'form-basic',
        //             title: 'Form Elements',
        //             type: 'item',
        //             url: '/forms/form-basic',
        //             icon: 'feather icon-file-text'
        //         },
        //         {
        //             id: 'bootstrap',
        //             title: 'Table',
        //             type: 'item',
        //             icon: 'feather icon-server',
        //             url: '/tables/bootstrap'
        //         }
        //     ]
        // },
        // {
        //     id: 'chart-maps',
        //     title: 'Chart & Maps',
        //     type: 'group',
        //     icon: 'icon-charts',
        //     children: [
        //         {
        //             id: 'charts',
        //             title: 'Charts',
        //             type: 'item',
        //             icon: 'feather icon-pie-chart',
        //             url: '/charts/nvd3'
        //         },
        //         {
        //             id: 'maps',
        //             title: 'Map',
        //             type: 'item',
        //             icon: 'feather icon-map',
        //             url: '/maps/google-map'
        //         }
        //     ]
        // },
        // {
        //     id: 'pages',
        //     title: 'Pages',
        //     type: 'group',
        //     icon: 'icon-pages',
        //     children: [
        //         {
        //             id: 'auth',
        //             title: 'Authentication',
        //             type: 'collapse',
        //             icon: 'feather icon-lock',
        //             badge: {
        //                 title: 'New',
        //                 type: 'label-danger'
        //             },
        //             children: [
        //                 {
        //                     id: 'signup-1',
        //                     title: 'Sign up',
        //                     type: 'item',
        //                     url: '/auth/signup-1',
        //                     target: true,
        //                     breadcrumbs: false
        //                 },
        //                 {
        //                     id: 'signin-1',
        //                     title: 'Sign in',
        //                     type: 'item',
        //                     url: '/auth/signin-1',
        //                     target: true,
        //                     breadcrumbs: false
        //                 }
        //             ]
        //         },

        //         {
        //             id: 'sample-page',
        //             title: 'Sample Page',
        //             type: 'item',
        //             url: '/sample-page',
        //             classes: 'nav-item',
        //             icon: 'feather icon-sidebar'
        //         },
        //         {
        //             id: 'docs',
        //             title: 'Documentation',
        //             type: 'item',
        //             url: '/docs',
        //             classes: 'nav-item',
        //             icon: 'feather icon-help-circle'
        //         },
        //         {
        //             id: 'menu-level',
        //             title: 'Menu Levels',
        //             type: 'collapse',
        //             icon: 'feather icon-menu',
        //             children: [
        //                 {
        //                     id: 'menu-level-1.1',
        //                     title: 'Menu Level 1.1',
        //                     type: 'item',
        //                     url: '#!',
        //                 },
        //                 {
        //                     id: 'menu-level-1.2',
        //                     title: 'Menu Level 2.2',
        //                     type: 'collapse',
        //                     children: [
        //                         {
        //                             id: 'menu-level-2.1',
        //                             title: 'Menu Level 2.1',
        //                             type: 'item',
        //                             url: '#',
        //                         },
        //                         {
        //                             id: 'menu-level-2.2',
        //                             title: 'Menu Level 2.2',
        //                             type: 'collapse',
        //                             children: [
        //                                 {
        //                                     id: 'menu-level-3.1',
        //                                     title: 'Menu Level 3.1',
        //                                     type: 'item',
        //                                     url: '#',
        //                                 },
        //                                 {
        //                                     id: 'menu-level-3.2',
        //                                     title: 'Menu Level 3.2',
        //                                     type: 'item',
        //                                     url: '#',
        //                                 }
        //                             ]
        //                         }
        //                     ]
        //                 }
        //             ]
        //         },
        //         {
        //             id: 'disabled-menu',
        //             title: 'Disabled Menu',
        //             type: 'item',
        //             url: '#',
        //             classes: 'nav-item disabled',
        //             icon: 'feather icon-power'
        //         },
        //         /*{
        //             id: 'buy-now',
        //             title: 'Buy Now',
        //             type: 'item',
        //             icon: 'feather icon-user',
        //             classes: 'nav-item',
        //             url: 'https://codedthemes.com',
        //             target: true,
        //             external: true,
        //             badge: {
        //                 title: 'v1.0',
        //                 type: 'label-primary'
        //             }
        //         }*/
        //     ]
        // }
    ]
}