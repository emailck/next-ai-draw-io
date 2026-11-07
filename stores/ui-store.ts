import { create } from "zustand"
import type { LegalDocKey } from "@/lib/brand"

export type SettingsTab = "models" | "general" | "drawing" | "about"
/** The models tab: its provider list, the provider picker or a provider */
export type ModelsPage = "list" | "picker" | { providerId: string }
export type MobileView = "canvas" | "chat"

interface UiState {
    /** Desktop: the floating chat panel is open */
    panelOpen: boolean
    /** The start screen was put away (drawing by hand, an opened file) */
    heroDismissed: boolean
    /** Phones: which half of the app is visible */
    mobileView: MobileView
    settingsOpen: boolean
    settingsTab: SettingsTab
    modelsPage: ModelsPage
    /** Version shown in the compare dialog, or null when closed */
    compareVersionId: string | null
    saveDialogOpen: boolean
    /** Commercial SaaS modals */
    pricingOpen: boolean
    betaNoticeOpen: boolean
    selectedPlanName: string | null
    legalOpen: boolean
    legalTab: LegalDocKey
    templatesModalOpen: boolean
    docsModalOpen: boolean
    /** Bumped to ask the composer to take focus */
    focusComposerToken: number
    setPanelOpen: (open: boolean) => void
    setHeroDismissed: (dismissed: boolean) => void
    togglePanel: () => void
    setMobileView: (view: MobileView) => void
    /** Opens on the given tab (else the last one); the models tab on its
     * list unless a page is given */
    openSettings: (tab?: SettingsTab, modelsPage?: ModelsPage) => void
    setSettingsOpen: (open: boolean) => void
    setSettingsTab: (tab: SettingsTab) => void
    setModelsPage: (page: ModelsPage) => void
    openCompare: (versionId: string) => void
    closeCompare: () => void
    setSaveDialogOpen: (open: boolean) => void
    setPricingOpen: (open: boolean) => void
    openBetaNotice: (planName?: string) => void
    setBetaNoticeOpen: (open: boolean) => void
    openLegal: (tab?: LegalDocKey) => void
    setLegalOpen: (open: boolean) => void
    setTemplatesModalOpen: (open: boolean) => void
    setDocsModalOpen: (open: boolean) => void
    focusComposer: () => void
}

export const useUiStore = create<UiState>((set) => ({
    panelOpen: true,
    heroDismissed: false,
    mobileView: "chat",
    settingsOpen: false,
    settingsTab: "general",
    modelsPage: "list",
    compareVersionId: null,
    saveDialogOpen: false,
    pricingOpen: false,
    betaNoticeOpen: false,
    selectedPlanName: null,
    legalOpen: false,
    legalTab: "terms",
    templatesModalOpen: false,
    docsModalOpen: false,
    focusComposerToken: 0,
    setPanelOpen: (open) => set({ panelOpen: open }),
    setHeroDismissed: (dismissed) => set({ heroDismissed: dismissed }),
    togglePanel: () => set((state) => ({ panelOpen: !state.panelOpen })),
    setMobileView: (view) => set({ mobileView: view }),
    openSettings: (tab, modelsPage = "list") =>
        set((state) => ({
            settingsOpen: true,
            settingsTab: tab ?? state.settingsTab,
            modelsPage,
        })),
    setSettingsOpen: (open) => set({ settingsOpen: open }),
    setSettingsTab: (tab) => set({ settingsTab: tab }),
    setModelsPage: (page) => set({ modelsPage: page }),
    openCompare: (versionId) => set({ compareVersionId: versionId }),
    closeCompare: () => set({ compareVersionId: null }),
    setSaveDialogOpen: (open) => set({ saveDialogOpen: open }),
    setPricingOpen: (open) => set({ pricingOpen: open }),
    openBetaNotice: (planName) =>
        set({
            betaNoticeOpen: true,
            selectedPlanName: planName ?? "Pro Plan",
        }),
    setBetaNoticeOpen: (open) => set({ betaNoticeOpen: open }),
    openLegal: (tab = "terms") =>
        set({
            legalOpen: true,
            legalTab: tab,
        }),
    setLegalOpen: (open) => set({ legalOpen: open }),
    setTemplatesModalOpen: (open) => set({ templatesModalOpen: open }),
    setDocsModalOpen: (open) => set({ docsModalOpen: open }),
    focusComposer: () =>
        set((state) => ({
            panelOpen: true,
            mobileView: "chat",
            focusComposerToken: state.focusComposerToken + 1,
        })),
}))
