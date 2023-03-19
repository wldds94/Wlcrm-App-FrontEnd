import { lazy } from 'react';

// MainApp import

// project import
import Loadable from 'components/loadable/Loadable';
import AppMain from 'app/main/AppMain';

// /**
//  * DASHBOARD
//  */
const DashboardRouterPage = Loadable(lazy(() => import('pages/dashboard/DashboardRouterPage')));
/**
 * SCHEDULE
 */
const ScheduleRouterPage = Loadable(lazy(() => import('pages/schedule/ScheduleRouterPage')));
const ScheduleListPage = Loadable(lazy(() => import('pages/schedule/panel/list/ScheduleListPage')));
const ScheduleTrashPage = Loadable(lazy(() => import('pages/schedule/panel/trash/ScheduleTrashPage')));
/**
 * CHAT
 */
const ChatRouterPage = Loadable(lazy(() => import('pages/chat/ChatRouterPage')));
const ChatChannelPage = Loadable(lazy(() => import('pages/chat/channel/ChatChannelPage')));
/**
 * CLIENTS
 */
const ClientsRouterPage = Loadable(lazy(() => import('pages/clients/ClientsRouterPage')));
const ClientsListPage = Loadable(lazy(() => import('pages/clients/list/ClientsListPage')));
const ClientsTrashPage = Loadable(lazy(() => import('pages/clients/trash/ClientsTrashPage')));
const ClientsCreatePage = Loadable(lazy(() => import('pages/clients/create/ClientsCreatePage')));
// - PROFILE
const ClientsProfileRouterPage = Loadable(lazy(() => import('pages/clients/profile/ClientsProfileRouterPage')));
const ClientsDashboardPage = Loadable(lazy(() => import('pages/clients/profile/dashboard/ClientsDashboardPage')));
const ClientsProfilePage = Loadable(lazy(() => import('pages/clients/profile/anagrafica/ClientsProfilePage')));
const ClientsProfileAppointmentsPage = Loadable(lazy(() => import('pages/clients/profile/appointments/ClientsProfileAppointmentsPage')));
const ClientsProfileJournalPage = Loadable(lazy(() => import('pages/clients/profile/journal/ClientsProfileJournalPage')));
// --- PROFILE INVOICE
const ClientsProfileInvoicesRouterPage = Loadable(lazy(() => import('pages/clients/profile/invoices/ClientsProfileInvoicesRouterPage')));
const ClientsProfileInvoicesPage = Loadable(lazy(() => import('pages/clients/profile/invoices/list/ClientsProfileInvoicesPage')));
const ClientsProfileInvoicesEditPage = Loadable(lazy(() => import('pages/clients/profile/invoices/edit/ClientsProfileInvoicesEditPage')));
const ClientsProfileInvoicesPreviewPage = Loadable(lazy(() => import('pages/clients/profile/invoices/preview/ClientsProfileInvoicesPreviewPage')));
/**
 * INVOICES
 */
const InvoicesRouterPage = Loadable(lazy(() => import('pages/invoices/InvoicesRouterPage')));
const InvoicesListPage = Loadable(lazy(() => import('pages/invoices/list/InvoicesListPage')));
const InvoicesCreatePage = Loadable(lazy(() => import('pages/invoices/create/InvoicesCreatePage')));
const InvoicesEditPage = Loadable(lazy(() => import('pages/invoices/create/InvoicesEditPage')));
/**
 * JOURNAL
 */
const ClinicalJournalRouterPage = Loadable(lazy(() => import('pages/journal/ClinicalJournalRouterPage')));
const ClinicalJournalPage = Loadable(lazy(() => import('pages/journal/list/ClinicalJournalPage')));
/**
 * COMPANY
 */
const CompanyRouterPage = Loadable(lazy(() => import('pages/company/CompanyRouterPage')));
const CompanyProfilePage = Loadable(lazy(() => import('pages/company/profile/CompanyProfilePage')));
const CompanyBanksPage = Loadable(lazy(() => import('pages/company/banks/CompanyBanksPage')));
const CompanyIvaPage = Loadable(lazy(() => import('pages/company/iva/CompanyIvaPage')));
const CompanyServicesPage = Loadable(lazy(() => import('pages/company/services/CompanyServicesPage')));
/**
 * ACCOUNT
 */
const AccountRouterPage = Loadable(lazy(() => import('pages/account/AccountRouterPage')));
const AccountProfilePage = Loadable(lazy(() => import('pages/account/profile/AccountProfilePage')));
const AccountDashboardPage = Loadable(lazy(() => import('pages/account/dashboard/AccountDashboardPage')));
// const AccountActivitiesPage = Loadable(lazy(() => import('pages/account/activities/AccountActivitiesPage')));
const AccountPrivacyPage = Loadable(lazy(() => import('pages/account/privacy/AccountPrivacyPage')));
/**
 * Management - MANAGEMENT
 * STATS
 */
const StatsRouterPage = Loadable(lazy(() => import('pages/management/StatsRouterPage')));
const ManagementDashboardPage = Loadable(lazy(() => import('pages/management/dashboard/ManagementDashboardPage')));
const StatsInvoicesPage = Loadable(lazy(() => import('pages/management/invoice/StatsInvoicesPage')));
const StatsClientsPage = Loadable(lazy(() => import('pages/management/clients/StatsClientsPage')));
const StatsEventsPage = Loadable(lazy(() => import('pages/management/events/StatsEventsPage')));
// const StatsServicesPage = Loadable(lazy(() => import('pages/management/services/StatsServicesPage')));
/**
 * SETTINGS
 */
const SettingsRouterPage = Loadable(lazy(() => import('pages/settings/SettingsRouterPage')));
const SettingsGeneralPage = Loadable(lazy(() => import('pages/settings/general/SettingsGeneralPage')));
// const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = {
    path: '/',
    element: <AppMain />,
    children: [
        {
            path: '/',
            element: <DashboardRouterPage />
        },
        {
            path: '/dashboard',
            element: <DashboardRouterPage />
        },
        // SCHEDULE
        {
            path: '/schedule',
            element: <ScheduleRouterPage />,
            children: [
                {
                    path: '', // anagrafica',
                    element: <ScheduleListPage />
                },
                {
                    path: 'trash', // anagrafica',
                    element: <ScheduleTrashPage />
                },
            ]
        },
        // CHAT
        {
            path: '/chat/channel/:channelID',
            element: <ChatRouterPage />,
            // children: [
            //     {
            //         path: '',
            //         element: <ChatChannelPage />
            //     },
            // ]
        },
        // CLIENT
        {
            path: '/clients',
            element: <ClientsRouterPage />,
            children: [
                {
                    path: 'view', // anagrafica',
                    element: <ClientsListPage />
                },
                {
                    path: 'trash', // anagrafica',
                    element: <ClientsTrashPage />
                },
                {
                    path: 'create', // anagrafica',
                    element: <ClientsCreatePage />
                },
            ]
        },
        {
            path: '/clients/profile/:clientsChiperID',
            element: <ClientsProfileRouterPage />,
            children: [
                {
                    path: '',
                    element: <ClientsDashboardPage />
                },
                {
                    path: 'view', // anagrafica',
                    element: <ClientsProfilePage />,
                },
                // {
                //     path: 'edit', // anagrafica',
                //     element: <ClientsProfilePage />
                // },
                {
                    path: 'journal', // anagrafica',
                    element: <ClientsProfileJournalPage />
                },
                {
                    path: 'appointment', // anagrafica',
                    element: <ClientsProfileAppointmentsPage />
                },
                {
                    path: 'fatture', // anagrafica',
                    element: <ClientsProfileInvoicesPage />,
                },
                {
                    path: 'fatture/:invoicesChiperID', // anagrafica',
                    element: <ClientsProfileInvoicesRouterPage />,
                    children: [
                        {
                            path: 'preview', // anagrafica',
                            element: <ClientsProfileInvoicesPreviewPage />
                        },
                        {
                            path: 'edit', // anagrafica',
                            element: <ClientsProfileInvoicesEditPage />
                        },
                    ]
                },
            ]
        },
        // INVOICES
        {
            path: 'invoices',
            element: <InvoicesRouterPage />,
            children: [
                {
                    path: 'list', // anagrafica',
                    element: <InvoicesListPage />
                },
                {
                    path: 'create', // anagrafica',
                    element: <InvoicesCreatePage />
                },
                {
                    path: 'create/:invoicesChiperID', // anagrafica',
                    element: <InvoicesEditPage />
                },
                // {
                //     path: 'edit/:chiperID', // anagrafica',
                //     element: <InvoicesCreatePage />
                // },
                // {
                //     path: 'trash', // anagrafica',
                //     element: <ClientsTrashPage />
                // },
            ]
        },
        // JOURNAL / CLINICAL
        {
            path: 'clinical',
            element: <ClinicalJournalRouterPage />,
            children: [
                {
                    path: '', // anagrafica',
                    element: <ClinicalJournalPage />
                },
                {
                    path: 'list', // anagrafica',
                    element: <ClinicalJournalPage />
                },
            ]
        },
        // COMPANY
        {
            path: 'company',
            element: <CompanyRouterPage />,
            children: [
                {
                    path: '', // anagrafica',
                    element: <CompanyProfilePage />
                },
                {
                    path: 'profile', // anagrafica',
                    element: <CompanyProfilePage />
                },
                {
                    path: 'banks', // anagrafica',
                    element: <CompanyBanksPage />
                },
                {
                    path: 'iva', // anagrafica',
                    element: <CompanyIvaPage />
                },
                {
                    path: 'services', // anagrafica',
                    element: <CompanyServicesPage />
                },
            ]
        },
        // ACCOUNT
        {
            path: 'account',
            element: <AccountRouterPage />,
            children: [
                {
                    path: '', // anagrafica',
                    element: <AccountDashboardPage />
                },
                {
                    path: 'profile', // anagrafica',
                    element: <AccountProfilePage />
                },
                // {
                //     path: 'activities', // anagrafica',
                //     element: <AccountActivitiesPage />
                // },
                {
                    path: 'privacy', // anagrafica',
                    element: <AccountPrivacyPage />
                },
            ],
        },
        // STATS
        {
            path: '/management',
            element: <StatsRouterPage />,
            children: [
                {
                    path: '', // anagrafica',
                    element: <ManagementDashboardPage />
                },
                {
                    path: 'invoices', // anagrafica',
                    element: <StatsInvoicesPage />
                },
                {
                    path: 'clients', // anagrafica',
                    element: <StatsClientsPage />
                },
                {
                    path: 'events', // anagrafica',
                    element: <StatsEventsPage />
                },
                // {
                //     path: 'services', // anagrafica',
                //     element: <StatsServicesPage />
                // },
            ]
        },
        // SETTINGS
        {
            path: 'settings',
            element: <SettingsRouterPage />,
            children: [
                {
                    path: '', // anagrafica',
                    element: <SettingsGeneralPage />
                },
                {
                    path: 'general', // anagrafica',
                    element: <SettingsGeneralPage />
                },
                /* {
                    path: 'invoice', // anagrafica',
                    element: <SettingsInvoicePage />,
                } */
            ]
        },
        //     // AUTH
        //     {
        //         path: 'logout',
        //         element: <LogOut />
        //     },

    ]
};

export default MainRoutes;

/**
const MainRoutes = {
    path: '/',
    element: <AppMain />,
    children: [
        {
            path: "",
            element: <ScrollTop />,
            children: [
                {
                    path: '/',
                    element: <DashboardRouterPage />
                },
                {
                    path: '/dashboard',
                    element: <DashboardRouterPage />
                },
                // SCHEDULE
                {
                    path: '/schedule',
                    element: <ScheduleRouterPage />,
                    children: [
                        {
                            path: '', // anagrafica',
                            element: <ScheduleListPage />
                        },
                        {
                            path: 'trash', // anagrafica',
                            element: <ScheduleTrashPage />
                        },
                    ]
                },
                // CHAT
                {
                    path: '/chat/channel/:channelID',
                    element: <ChatRouterPage />,
                    // children: [
                    //     {
                    //         path: '',
                    //         element: <ChatChannelPage />
                    //     },
                    // ]
                },
                // CLIENT
                {
                    path: '/clients',
                    element: <ClientsRouterPage />,
                    children: [
                        {
                            path: 'view', // anagrafica',
                            element: <ClientsListPage />
                        },
                        {
                            path: 'trash', // anagrafica',
                            element: <ClientsTrashPage />
                        },
                        {
                            path: 'create', // anagrafica',
                            element: <ClientsCreatePage />
                        },
                    ]
                },
                {
                    path: '/clients/profile/:clientsChiperID',
                    element: <ClientsProfileRouterPage />,
                    children: [
                        {
                            path: '',
                            element: <ClientsDashboardPage />
                        },
                        {
                            path: 'view', // anagrafica',
                            element: <ClientsProfilePage />,
                        },
                        // {
                        //     path: 'edit', // anagrafica',
                        //     element: <ClientsProfilePage />
                        // },
                        {
                            path: 'journal', // anagrafica',
                            element: <ClientsProfileJournalPage />
                        },
                        {
                            path: 'appointment', // anagrafica',
                            element: <ClientsProfileAppointmentsPage />
                        },
                        {
                            path: 'fatture', // anagrafica',
                            element: <ClientsProfileInvoicesPage />,
                        },
                        {
                            path: 'fatture/:invoicesChiperID', // anagrafica',
                            element: <ClientsProfileInvoicesRouterPage />,
                            children: [
                                {
                                    path: 'preview', // anagrafica',
                                    element: <ClientsProfileInvoicesPreviewPage />
                                },
                                {
                                    path: 'edit', // anagrafica',
                                    element: <ClientsProfileInvoicesEditPage />
                                },
                            ]
                        },
                    ]
                },
                // INVOICES
                {
                    path: 'invoices',
                    element: <InvoicesRouterPage />,
                    children: [
                        {
                            path: 'list', // anagrafica',
                            element: <InvoicesListPage />
                        },
                        {
                            path: 'create', // anagrafica',
                            element: <InvoicesCreatePage />
                        },
                        {
                            path: 'create/:invoicesChiperID', // anagrafica',
                            element: <InvoicesEditPage />
                        },
                        // {
                        //     path: 'edit/:chiperID', // anagrafica',
                        //     element: <InvoicesCreatePage />
                        // },
                        // {
                        //     path: 'trash', // anagrafica',
                        //     element: <ClientsTrashPage />
                        // },
                    ]
                },
                // JOURNAL / CLINICAL
                {
                    path: 'clinical',
                    element: <ClinicalJournalRouterPage />,
                    children: [
                        {
                            path: '', // anagrafica',
                            element: <ClinicalJournalPage />
                        },
                        {
                            path: 'list', // anagrafica',
                            element: <ClinicalJournalPage />
                        },
                    ]
                },
                // COMPANY
                {
                    path: 'company',
                    element: <CompanyRouterPage />,
                    children: [
                        {
                            path: '', // anagrafica',
                            element: <CompanyProfilePage />
                        },
                        {
                            path: 'profile', // anagrafica',
                            element: <CompanyProfilePage />
                        },
                        {
                            path: 'banks', // anagrafica',
                            element: <CompanyBanksPage />
                        },
                        {
                            path: 'iva', // anagrafica',
                            element: <CompanyIvaPage />
                        },
                        {
                            path: 'services', // anagrafica',
                            element: <CompanyServicesPage />
                        },
                    ]
                },
                // ACCOUNT
                {
                    path: 'account',
                    element: <AccountRouterPage />,
                    children: [
                        {
                            path: '', // anagrafica',
                            element: <AccountDashboardPage />
                        },
                        {
                            path: 'profile', // anagrafica',
                            element: <AccountProfilePage />
                        },
                        // {
                        //     path: 'activities', // anagrafica',
                        //     element: <AccountActivitiesPage />
                        // },
                        {
                            path: 'privacy', // anagrafica',
                            element: <AccountPrivacyPage />
                        },
                    ],
                },
                // STATS
                {
                    path: '/management',
                    element: <StatsRouterPage />,
                    children: [
                        {
                            path: '', // anagrafica',
                            element: <ManagementDashboardPage />
                        },
                        {
                            path: 'invoices', // anagrafica',
                            element: <StatsInvoicesPage />
                        },
                        {
                            path: 'clients', // anagrafica',
                            element: <StatsClientsPage />
                        },
                        {
                            path: 'events', // anagrafica',
                            element: <StatsEventsPage />
                        },
                        // {
                        //     path: 'services', // anagrafica',
                        //     element: <StatsServicesPage />
                        // },
                    ]
                },
                // SETTINGS
                {
                    path: 'settings',
                    element: <SettingsRouterPage />,
                    children: [
                        {
                            path: '', // anagrafica',
                            element: <SettingsGeneralPage />
                        },
                        {
                            path: 'general', // anagrafica',
                            element: <SettingsGeneralPage />
                        },
                    ]
                },
                //     // AUTH
                //     {
                //         path: 'logout',
                //         element: <LogOut />
                //     },

            ]
        }
    ]
};
 */