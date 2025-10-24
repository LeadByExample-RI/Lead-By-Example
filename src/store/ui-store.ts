import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UIState, UIActions, Notification, ModalState } from '@/types/store';
import { generateId } from '@/utils/helpers';

interface UIStore extends UIState, UIActions {}

export const useUIStore = create<UIStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      theme: 'system',
      sidebarOpen: false,
      mobileMenuOpen: false,
      loading: false,
      notifications: [],
      modals: [],

      // Actions
      setTheme: (theme) => {
        set({ theme });
        // Apply theme to document
        if (typeof window !== 'undefined') {
          const root = window.document.documentElement;
          root.classList.remove('light', 'dark');
          
          if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
          } else {
            root.classList.add(theme);
          }
        }
      },

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

      setLoading: (loading) => set({ loading }),

      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: generateId(),
          createdAt: new Date()
        };

        set((state) => ({
          notifications: [...state.notifications, newNotification]
        }));

        // Auto-remove notification after duration
        if (notification.duration && notification.duration > 0) {
          setTimeout(() => {
            get().removeNotification(newNotification.id);
          }, notification.duration);
        }
      },

      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),

      clearNotifications: () => set({ notifications: [] }),

      openModal: (modal) => {
        const newModal: ModalState = {
          ...modal,
          id: generateId()
        };

        set((state) => ({
          modals: [...state.modals, newModal]
        }));

        return newModal.id;
      },

      closeModal: (id) => set((state) => ({
        modals: state.modals.filter(m => m.id !== id)
      })),

      closeAllModals: () => set({ modals: [] })
    }),
    { name: 'ui-store' }
  )
);

// Selectors
export const useTheme = () => useUIStore((state) => state.theme);
export const useIsDarkMode = () => useUIStore((state) => {
  if (state.theme === 'dark') return true;
  if (state.theme === 'light') return false;
  // For system theme, check if we're on client and get system preference
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
});

export const useIsLoading = () => useUIStore((state) => state.loading);
export const useNotifications = () => useUIStore((state) => state.notifications);
export const useModals = () => useUIStore((state) => state.modals);
export const useIsMobileMenuOpen = () => useUIStore((state) => state.mobileMenuOpen);
export const useIsSidebarOpen = () => useUIStore((state) => state.sidebarOpen);

// Actions
export const useUIActions = () => useUIStore((state) => ({
  setTheme: state.setTheme,
  toggleSidebar: state.toggleSidebar,
  toggleMobileMenu: state.toggleMobileMenu,
  setLoading: state.setLoading,
  addNotification: state.addNotification,
  removeNotification: state.removeNotification,
  clearNotifications: state.clearNotifications,
  openModal: state.openModal,
  closeModal: state.closeModal,
  closeAllModals: state.closeAllModals
}));
