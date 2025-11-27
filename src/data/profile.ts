export type Locale = 'en' | 'ja';

export type Experience = {
  company: string;
  role: string;
  period: string;
  focus: string;
  bullets: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type ProfileContent = {
  hero: {
    greeting: string;
    title: string;
    subtitle: string;
    prompt: string;
    likesIntro: string;
    likes: string[];
  };
  contact: {
    email: string;
    github: string;
  };
  highlights: string[];
  experiences: Experience[];
  skillGroups: SkillGroup[];
  terminalLines: string[];
};

export const profileContent: Record<Locale, ProfileContent> = {
  en: {
    hero: {
      greeting: 'hello world, I\'m',
      title: 'Tatsuki Tanaka',
      subtitle:
        'DevOps engineer, Linux-native full-stack builder, and UI/UX designer crafting terminal-driven workflows.',
      prompt: 'tatsuki@arch ~ $',
      likesIntro: 'currently geeking out about',
      likes: [
        'Arch Linux & custom kernels',
        'system administration & observability',
        'reverse-engineering and flashing phones',
        'studying complex systems & Japanese language',
        'free/open-source software communities',
        'UI/UX research and tactile interfaces',
      ],
    },
    contact: {
      email: 'tatsuki@tanakatatsuki.dev',
      github: 'https://github.com/iLtanaka',
    },
    highlights: [
      'DevOps + product mindset since 2021, comfortable across CI/CD, backend APIs, and design systems.',
      'Shrank custom email automation time from 8 hours to 2 seconds with Make.com/Zapier + custom scripts.',
      'Keeps several mixed-OS workstations and multi-server labs reliable using Linux-first tooling.',
      'Creates human interfaces for ERP dashboards, Telegram Mini Apps, and experimental UI/UX prototypes.',
    ],
    experiences: [
      {
        company: 'MYI Technologies DOO',
        role: 'Web Developer · DevOps Specialist',
        period: 'Jan 2025 – Present',
        focus: 'CI/CD pipelines, Dockerized services, ERP frontends.',
        bullets: [
          'Design GitHub Actions flows that build, test, and deploy micro frontends & services.',
          'Containerize internal tooling and orchestrate releases with Docker Compose & IaC scripts.',
          'Prototype UX for internal ERP dashboards while mentoring teammates on design systems.',
        ],
      },
      {
        company: 'IT-Cube',
        role: 'Systems Administrator',
        period: 'Aug 2022 – Aug 2025',
        focus: 'Hybrid workplace infrastructure, automation, on-site reliability.',
        bullets: [
          'Standardized several workstations and re-engineered Keenetic routing to cut tickets by 50%.',
          'Built Bash/Node.js monitors for Linux servers + NAS backups with alerting hooks.',
          'Handled everything from cabling to advanced systemd/network tuning across Debian/Ubuntu.',
        ],
      },
      {
        company: 'RetailBox Inc.',
        role: 'Automation Engineer · Web Developer',
        period: 'Aug 2024 – Apr 2025',
        focus: 'Customer comms automation and realtime frontends.',
        bullets: [
          'Automated email marketing through Make.com & Zapier reducing manual prep to mere seconds.',
          'Delivered a realtime Telegram Mini App game UI with React + WebSocket streaming.',
          'Customized WordPress themes and design systems for campaigns and landing pages.',
        ],
      },
      {
        company: 'Freelance / Independent',
        role: 'Full-stack Developer · Automation Specialist',
        period: 'Mar 2021 – Present',
        focus: 'Small-business platforms, bots, and UI/UX prototypes.',
        bullets: [
          'Launched 10+ bespoke sites, incl. cosmetics booking frontends and internal project portals.',
          'Built Discord bots, parsers, and API integrations in Python (Disnake, aiohttp, BeautifulSoup).',
          'Iterated UI/UX flows in Figma, aligning visuals with automation-heavy backends.',
        ],
      },
    ],
    skillGroups: [
      {
        label: 'DevOps / Infra',
        items: ['Docker', 'GitHub Actions', 'GitLab CI', 'Linux', 'Systemd', 'Networking'],
      },
      {
        label: 'Backend & Automation',
        items: ['Python', 'Node.js', 'PostgreSQL', 'MongoDB', 'Redis', 'API design'],
      },
      {
        label: 'Frontend & UI/UX',
        items: ['React', 'Vue', 'Telegram Mini Apps', 'HTML/SCSS', 'Figma', 'Design systems'],
      },
      {
        label: 'Monitoring & Observability',
        items: ['Prometheus', 'Grafana', 'Zabbix', 'ELK basics', 'Custom scripts'],
      },
    ],
    terminalLines: [
      'neofetch --user tatsuki',
      'uptime: 4+ years shipping infra & products',
      'fav distro: Arch Linux (btw)',
      'current focus: CI/CD, UX for tooling, Japanese studies',
      'status: available for product-minded DevOps & UI roles',
    ],
  },
  ja: {
    hero: {
      greeting: 'こんにちは、',
      title: '田中 達樹 (Tatsuki)',
      subtitle:
        'DevOps エンジニア / Linux ネイティブのフルスタック / UI・UX デザイナー。端末思考でプロダクトを作ります。',
      prompt: 'tatsuki@arch ~ $',
      likesIntro: '最近ハマっていること',
      likes: [
        'Arch Linux とカスタムカーネル',
        'システム管理とオブザーバビリティ',
        'システムの探究とモバイル端末の書き換え',
        '自由ソフトウェアとコミュニティ',
        'UI/UX リサーチと触覚的なインターフェース',
        '日本語の勉強といつかの移住計画',
      ],
    },
    contact: {
      email: 'tatsuki@tanakatatsuki.dev',
      github: 'https://github.com/iLtanaka',
    },
    highlights: [
      '2021年から DevOps + プロダクト志向で、CI/CD・バックエンド・デザインまで一気通貫。',
      'Make.com / Zapier と自作スクリプトでメール自動化を8時間→2秒に短縮。',
      '複数の異なるOSを搭載したワークステーションやマルチサーバーのラボ環境を、Linuxを中心としたツールで安定的に運用している。',
      'ERP ダッシュボードや Telegram Mini Apps のUI/UX設計を担当。',
    ],
    experiences: [
      {
        company: 'MYI Technologies DOO',
        role: 'Web Developer・DevOps Specialist',
        period: '2025年1月 – 現在',
        focus: 'CI/CD、Docker サービス、ERP フロントエンド。',
        bullets: [
          'GitHub Actions でマイクロサービスのビルド/テスト/デプロイを自動化。',
          'Docker Compose と IaC スクリプトで内製ツールをコンテナ化。',
          '社内ERPのUIプロトタイピングとデザインシステムの指導。',
        ],
      },
      {
        company: 'IT-Cube',
        role: 'システム管理者',
        period: '2022年8月 – 2025年8月',
        focus: 'ハイブリッド環境のインフラ運用と自動化。',
        bullets: [
          '複数の異なるOSを搭載したワークステーションやマルチサーバーのラボ環境を、Linuxを中心としたツールで安定的に運用している。',
          'Bash / Node.js 監視と NAS バックアップの自動化を構築。',
          '配線から systemd / ネットワークの高度調整まで幅広く担当。',
        ],
      },
      {
        company: 'RetailBox Inc.',
        role: 'オートメーションエンジニア・Web デベロッパー',
        period: '2024年8月 – 2025年4月',
        focus: '顧客コミュニケーション自動化とリアルタイムフロント。',
        bullets: [
          'Make.com と Zapier によるメール自動化で手作業を数秒に短縮。',
          'React + WebSocket でリアルタイム Telegram Mini App を開発。',
          'キャンペーン向け WordPress テーマとデザインシステムを調整。',
        ],
      },
      {
        company: 'フリーランス / Independent',
        role: 'フルスタック開発者・自動化スペシャリスト',
        period: '2021年3月 – 現在',
        focus: 'スモールビジネス向けプラットフォームとUI/UX試作。',
        bullets: [
          '10件以上の受託サイトを開発。美容系予約UIや内製ポータルも担当。',
          'Python (Disnake, aiohttp, BeautifulSoup) でボット・パーサー・API連携を構築。',
          'Figma でのUI/UX設計と自動化バックエンドの整合を推進。',
        ],
      },
    ],
    skillGroups: [
      {
        label: 'DevOps / インフラ',
        items: ['Docker', 'GitHub Actions', 'GitLab CI', 'Linux', 'Systemd', 'Networking'],
      },
      {
        label: 'バックエンド & 自動化',
        items: ['Python', 'Node.js', 'PostgreSQL', 'MongoDB', 'Redis', 'API 設計'],
      },
      {
        label: 'フロントエンド & UI/UX',
        items: ['React', 'Vue', 'Telegram Mini Apps', 'HTML/SCSS', 'Figma', 'Design systems'],
      },
      {
        label: '監視 / Observability',
        items: ['Prometheus', 'Grafana', 'Zabbix', 'ELK (基礎)', 'カスタムスクリプト'],
      },
    ],
    terminalLines: [
      'neofetch --user tatsuki',
      'uptime: 4年以上 インフラ & プロダクト開発',
      'fav distro: Arch Linux (btw)',
      'focus: CI/CD・ツールのUX・日本語学習',
      'status: DevOps / UI 案件を募集中',
    ],
  },
};
