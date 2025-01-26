export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Nextek Teste",
  description:
    "Teste para a empresa Nextek",
  mainNav: [
    {
      title: "Tarefas",
      href: "/",
      security: 'public',
      type: 'button'
    },
    {
      title: "Usuários",
      href: "/users",
      security: 'public',
      type: 'button'
    },
  ],
  links: {
    home: "/",
  },
};
