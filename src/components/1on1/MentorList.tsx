"use client";

import { useState } from "react";
import MentorCard from "./MentorCard";

// ── 技術分野フィルター ──
const techFieldFilters = [
  { id: "HTML", label: "HTML" }, { id: "CSS", label: "CSS" },
  { id: "JavaScript", label: "JavaScript" }, { id: "TypeScript", label: "TypeScript" },
  { id: "React", label: "React" }, { id: "Next.js", label: "Next.js" },
  { id: "Vue.js", label: "Vue.js" }, { id: "Node.js", label: "Node.js" },
  { id: "Python", label: "Python" }, { id: "Go", label: "Go" },
  { id: "Rust", label: "Rust" }, { id: "Swift", label: "Swift" },
  { id: "Kotlin", label: "Kotlin" }, { id: "Flutter", label: "Flutter" },
  { id: "AWS", label: "AWS" }, { id: "Docker", label: "Docker" },
  { id: "Java", label: "Java" }, { id: "Ruby", label: "Ruby" },
  { id: "Kubernetes", label: "Kubernetes" }, { id: "Terraform", label: "Terraform" },
];


export const mentors = [
  { name: "ちゅーやん", company: "フリーランス", level: "初心者OK" as const, englishOk: false, skills: ["Android", "iOS", "Flutter"], catchphrase: "Flutterのことなら何でも聞いてね！モバイル開発が大好きです", avatarUrl: "https://techbowl.s3-ap-northeast-1.amazonaws.com/techbowl/DzjceQsAg9HShbr1706187471.jpg_1.jpg", availability: "available" as const, recentTopics: ["アプリ設計", "UI実装"] },
  { name: "スー", company: "Mosh株式会社", level: "初心者OK" as const, englishOk: false, skills: ["TypeScript", "React", "Next.js"], catchphrase: "フロントエンド設計の話、いくらでも付き合います", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/ac10e6800b649ae3b024fe07ab2ce787.jpg", availability: "few" as const, recentTopics: ["設計レビュー", "状態管理"] },
  { name: "武田 憲太郎", company: "大手IT企業", level: "Rank3以上" as const, englishOk: false, skills: ["Java", "Spring", "AWS"], catchphrase: "大規模サービスの裏側、気になりませんか？", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/7e6f7810e6282307454bfe3168f4744f.jpg", availability: "available" as const, recentTopics: ["API設計", "クラウド構築"] },
  { name: "keigo", company: "スタートアップ", level: "初心者OK" as const, englishOk: false, skills: ["Ruby", "Rails", "GCP"], catchphrase: "スタートアップの技術選定、リアルな話します", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/1c28eb74d6e9a7c6edbbfcee6fcd8950.jpg", availability: "available" as const, recentTopics: ["技術選定", "DB設計"] },
  { name: "sugit (すぎっと)", company: "Web系企業", level: "初心者OK" as const, englishOk: false, skills: ["Python", "Django", "PostgreSQL"], catchphrase: "Python大好き！初心者も大歓迎です", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/95e651664d444ac77419cf098f6a0d82.jpg", availability: "full" as const, recentTopics: ["API設計", "DB設計"] },
  { name: "Riku Nagano", company: "フリーランス", level: "初心者OK" as const, englishOk: false, skills: ["Flutter", "Dart", "Firebase"], catchphrase: "個人開発からフリーランスになった話、聞きますか？", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/1ccaef442f383bc726a91362fd58c868.jpg", availability: "available" as const, recentTopics: ["リリース相談", "個人開発"] },
  { name: "Amane", company: "メガベンチャー", level: "Rank3以上" as const, englishOk: true, skills: ["Kubernetes", "Terraform", "AWS"], catchphrase: "インフラって実は面白いんですよ", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/5d10f6e9dac5afae91998374c2a79394.jpg", availability: "few" as const, recentTopics: ["インフラ構築", "CI/CD改善"] },
  { name: "Kodani", company: "大手IT", level: "初心者OK" as const, englishOk: false, skills: ["React", "TypeScript", "CSS"], catchphrase: "CSSで困ったら気軽に相談してね", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/5a15997fa10fc473195bbe23f9e1e971.jpg", availability: "available" as const, recentTopics: ["CSS設計", "コンポ設計"] },
  { name: "Ugo", company: "スタートアップ", level: "Rank3以上" as const, englishOk: true, skills: ["Rust", "Go", "Linux"], catchphrase: "低レイヤーの世界、一緒に覗いてみませんか", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/11f23c520854a093446fd93aa7196d31.jpg", availability: "full" as const, recentTopics: ["性能改善", "システム設計"] },
  { name: "kei", company: "外資系IT", level: "Rank3以上" as const, englishOk: true, skills: ["C++", "Python", "機械学習"], catchphrase: "外資テックへの就活、リアルにお話しします", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/a442f65b3215ae7d3df3729af4f81b64.jpg", availability: "available" as const, recentTopics: ["キャリア相談", "AI活用相談"] },
  { name: "Yusuke (zukky)", company: "AI企業", level: "Rank3以上" as const, englishOk: true, skills: ["Python", "PyTorch", "MLOps"], catchphrase: "AI開発の最前線で何が起きてるか、教えます", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/727973f1d45d2dcbeef38974bb15e776.jpg", availability: "few" as const, recentTopics: ["モデル設計", "MLOps相談"] },
  { name: "sivchari", company: "メガベンチャー", level: "初心者OK" as const, englishOk: false, skills: ["Java", "Kotlin", "Spring"], catchphrase: "Kotlin推し。Javaからの移行相談も歓迎", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/64d9c051ca1ff10fcdbc63c386848fad.jpg", availability: "available" as const, recentTopics: ["言語移行", "設計相談"] },
  { name: "Kohei", company: "Web系企業", level: "初心者OK" as const, englishOk: false, skills: ["AWS", "Docker", "CI/CD"], catchphrase: "デプロイが怖い？一緒に克服しましょう", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/5d3b13f1e705d64444619a1a8b77f1f0.jpg", availability: "available" as const, recentTopics: ["CI/CD改善", "環境構築"] },
  { name: "Hidetsugu", company: "フリーランス", level: "初心者OK" as const, englishOk: false, skills: ["Swift", "iOS", "UIKit"], catchphrase: "iOSアプリ作りたい人、集まれ〜！", avatarUrl: "https://techbowl-production.s3-ap-northeast-1.amazonaws.com/techbowl/%E7%8E%89%E6%9C%A8_%E8%8B%B1%E5%97%A3.jpg", availability: "full" as const, recentTopics: ["アプリ設計", "リリース相談"] },
  { name: "Shintaro", company: "大手IT", level: "初心者OK" as const, englishOk: true, skills: ["PjM", "Agile", "Scrum"], catchphrase: "技術だけじゃない、チームで働く力も大事だよ", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/af99631dba0fdd4e4f22d33e143a506d.jpg", availability: "available" as const, recentTopics: ["チーム運営", "キャリア相談"] },
  { name: "Jumpei", company: "スタートアップ", level: "初心者OK" as const, englishOk: false, skills: ["Next.js", "Node.js", "PostgreSQL"], catchphrase: "フルスタックって楽しいよ、全部触れるから", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/1507d3653c03035f569bb32b940fdde1.jpg", availability: "few" as const, recentTopics: ["設計レビュー", "DB設計"] },
  { name: "Ou", company: "メガベンチャー", level: "初心者OK" as const, englishOk: false, skills: ["Vue.js", "Nuxt", "TypeScript"], catchphrase: "Vue.js愛してます。React派の人も歓迎", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/d4234c233cf55d46522a48ea5dbe272b.jpg", availability: "available" as const, recentTopics: ["コンポ設計", "状態管理"] },
  { name: "Kanon(きゃのん)", company: "外資IT", level: "Rank3以上" as const, englishOk: true, skills: ["GCP", "Kubernetes", "Go"], catchphrase: "GCPのカンファレンスの70%に僕はいます", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/46c473fb2b87dd2349d2b187fb91d750.jpg", availability: "full" as const, recentTopics: ["クラウド構築", "技術選定"] },
  { name: "西谷 圭介", company: "大手IT", level: "Rank3以上" as const, englishOk: false, skills: ["Java", "DDD", "マイクロサービス"], catchphrase: "設計って奥が深い。一緒に考えましょう", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/b6be831e277c7a465ea73907b119d7e2.jpg", availability: "available" as const, recentTopics: ["DDD相談", "設計レビュー"] },
  { name: "いけぴ", company: "フリーランス", level: "初心者OK" as const, englishOk: false, skills: ["PHP", "Laravel", "Vue.js"], catchphrase: "日本にLaravelを普及させたい！", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/75a57523307ff8007ff03c00f6e051ad.jpg", availability: "available" as const, recentTopics: ["API設計", "環境構築"] },
  { name: "thinceller", company: "Web系企業", level: "初心者OK" as const, englishOk: false, skills: ["Ruby", "Rails", "AWS"], catchphrase: "Railsでサクッとプロダクト作る話、します", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/4c93eada6ebf3bd9b7dab908d2b89e3e.jpg", availability: "few" as const, recentTopics: ["開発効率化", "技術選定"] },
  { name: "unotovive (おとべ)", company: "スタートアップ", level: "Rank3以上" as const, englishOk: false, skills: ["Go", "gRPC", "Kubernetes"], catchphrase: "技術選定で迷ったら声かけてください", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/79207d96672966d0fdabf2af521b7b7e.jpg", availability: "available" as const, recentTopics: ["技術選定", "API設計"] },
  { name: "くろたく", company: "メガベンチャー", level: "初心者OK" as const, englishOk: false, skills: ["Python", "SQL", "BigQuery"], catchphrase: "データの力でプロダクトは変わる", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/3da85f2a1412ad1bb6062c179eb5faaa.jpg", availability: "available" as const, recentTopics: ["データ分析", "SQL相談"] },
  { name: "takanorip", company: "外資IT", level: "Rank3以上" as const, englishOk: true, skills: ["C#", ".NET", "Azure"], catchphrase: ".NETの世界、意外と面白いですよ", avatarUrl: "https://techbowl.s3-ap-northeast-1.amazonaws.com/techbowl/vSyROwB7l5ePQjT1637887201.png_1.png", availability: "full" as const, recentTopics: ["設計相談", "クラウド構築"] },
  { name: "Wangchangdog", company: "フリーランス", level: "初心者OK" as const, englishOk: false, skills: ["React", "TypeScript", "Figma"], catchphrase: "デザインもコードも両方やってます", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/10394d60fb5f9de9a81388678807dc4b.jpg", availability: "available" as const, recentTopics: ["UI設計", "デザイン相談"] },
  { name: "イワケン", company: "大手IT", level: "Rank3以上" as const, englishOk: false, skills: ["セキュリティ", "AWS", "ネットワーク"], catchphrase: "セキュリティ、知らないと怖いけど知ると楽しい", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/672249ed7128957e83f084afbcbb764e.jpg", availability: "few" as const, recentTopics: ["脆弱性診断", "セキュリティ"] },
  { name: "Shirai", company: "スタートアップ", level: "初心者OK" as const, englishOk: false, skills: ["Android", "Kotlin", "Jetpack"], catchphrase: "Android開発のモダンなやり方、教えます", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/f9fbf999aa0793f283f2a1f0cbd04cd0.jpg", availability: "available" as const, recentTopics: ["アプリ設計", "UI実装"] },
  { name: "うめがね", company: "Web系企業", level: "Rank3以上" as const, englishOk: false, skills: ["Terraform", "AWS", "Ansible"], catchphrase: "インフラをコードで管理する気持ちよさ、伝えたい", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/f43ab3aec016108a10688ee29bde08bf.jpg", availability: "available" as const, recentTopics: ["IaC相談", "インフラ構築"] },
  { name: "sho_yamane", company: "メガベンチャー", level: "初心者OK" as const, englishOk: false, skills: ["React", "Next.js", "GraphQL"], catchphrase: "GraphQLの良さ、語らせてください", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/0f1afe66ee296ae506ec20175f7fc365.jpg", availability: "available" as const, recentTopics: ["性能改善", "API設計"] },
  { name: "akkey", company: "フリーランス", level: "初心者OK" as const, englishOk: false, skills: ["Python", "FastAPI", "Docker"], catchphrase: "FastAPIでAPI作る楽しさ、共有します", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/techbowl/2022-logo+-+Akio+Itaya.jpg_2.jpg", availability: "few" as const, recentTopics: ["API設計", "環境構築"] },
  { name: "Nozomu", company: "スタートアップ", level: "Rank3以上" as const, englishOk: false, skills: ["Elixir", "Phoenix", "PostgreSQL"], catchphrase: "Elixirという最高の言語を布教中", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/3bb4b05cac7e616fa4ee8c5f356d3424.jpg", availability: "available" as const, recentTopics: ["技術選定", "設計相談"] },
  { name: "Shota Yamane", company: "大手IT", level: "初心者OK" as const, englishOk: false, skills: ["Java", "Spring Boot", "MySQL"], catchphrase: "エンタープライズ開発のリアル、話します", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/48c1a949ca71e05130fec9841adba9c8.jpg", availability: "available" as const, recentTopics: ["DB設計", "コードレビュー"] },
  { name: "Yusei", company: "外資IT", level: "Rank3以上" as const, englishOk: true, skills: ["Go", "Rust", "分散システム"], catchphrase: "分散システムの沼へようこそ", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/07fc45eaadcbb81cdd498fbb0499c925.jpg", availability: "full" as const, recentTopics: ["システム設計", "性能改善"] },
  { name: "Yoshiaki", company: "メガベンチャー", level: "Rank3以上" as const, englishOk: false, skills: ["Scala", "Spark", "Kafka"], catchphrase: "大規模データ処理の面白さを伝えたい", avatarUrl: "https://techbowl.s3-ap-northeast-1.amazonaws.com/techbowl/%E5%86%85%E8%97%A4%E3%81%95%E3%82%93.jpg_1.jpg", availability: "available" as const, recentTopics: ["データ基盤", "性能改善"] },
  { name: "Osamu", company: "Web系企業", level: "初心者OK" as const, englishOk: false, skills: ["GitHub Actions", "Docker", "AWS"], catchphrase: "CI/CD整えると開発が100倍快適になるよ", avatarUrl: "https://techbowl-production.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/4e5b498f30fffc652e74d8fea52a2882.jpg", availability: "few" as const, recentTopics: ["CI/CD改善", "自動化相談"] },
  { name: "Gisshi", company: "フリーランス", level: "初心者OK" as const, englishOk: false, skills: ["Node.js", "Express", "MongoDB"], catchphrase: "バックエンド入門、やさしく教えます", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/e4bfd94315ef8f95e5a58ebc2567d3e4.jpg", availability: "available" as const, recentTopics: ["API設計", "DB設計"] },
  { name: "Shoya", company: "スタートアップ", level: "初心者OK" as const, englishOk: false, skills: ["TypeScript", "React", "Prisma"], catchphrase: "最近起業しました。カレンダーアプリ作ってます", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/e912161c5ad9163a58f33fc401f86a73.jpg", availability: "available" as const, recentTopics: ["コンポ設計", "開発効率化"] },
  { name: "shinnosuke", company: "大手IT", level: "初心者OK" as const, englishOk: false, skills: ["テスト自動化", "Selenium", "CI/CD"], catchphrase: "テスト書くの、実は楽しいんだよ", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/8f3712882e096bec9a7ffcf36e7d19ae.jpg", availability: "full" as const, recentTopics: ["テスト設計", "CI/CD改善"] },
  { name: "yuta", company: "外資IT", level: "Rank3以上" as const, englishOk: true, skills: ["Linux", "Prometheus", "Grafana"], catchphrase: "監視ダッシュボード眺めるのが趣味です", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/5dd8170a24e8c730b5d143d9144c45f6.jpg", availability: "available" as const, recentTopics: ["監視設計", "障害対応"] },
  { name: "Takuya", company: "Web系企業", level: "初心者OK" as const, englishOk: false, skills: ["Angular", "RxJS", "TypeScript"], catchphrase: "Angular推し。少数派だけど最高です", avatarUrl: "https://techbowl-production.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/08c17a5c7af103ae52dd0cdab1973a45.png", availability: "available" as const, recentTopics: ["設計レビュー", "状態管理"] },
  { name: "Tsukunii - Shingo Tsukuda", company: "フリーランス", level: "初心者OK" as const, englishOk: false, skills: ["PHP", "WordPress", "JavaScript"], catchphrase: "PHPカンファレンスにしょっちゅう顔出してます", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/4ce7a51dee3531de3e8b8125007f2193.jpg", availability: "few" as const, recentTopics: ["CMS構築", "開発効率化"] },
  { name: "Yosuke", company: "スタートアップ", level: "初心者OK" as const, englishOk: false, skills: ["React Native", "TypeScript", "Expo"], catchphrase: "1つのコードでiOS/Android両方作れるの最高", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/558386cef9311a69ef0862a5d288d4ad.jpg", availability: "available" as const, recentTopics: ["アプリ設計", "リリース相談"] },
  { name: "Satoshi", company: "メガベンチャー", level: "Rank3以上" as const, englishOk: false, skills: ["Python", "Django", "Redis"], catchphrase: "パフォーマンスチューニングが得意です", avatarUrl: "https://techbowl-production.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/f6aa3df8a58b10272a1e348a7fb357c1.jpg", availability: "available" as const, recentTopics: ["性能改善", "API設計"] },
  { name: "Yuki", company: "大手IT", level: "初心者OK" as const, englishOk: false, skills: ["AWS", "CloudFormation", "Lambda"], catchphrase: "サーバーレスの世界、案内します", avatarUrl: "https://techbowl.s3-ap-northeast-1.amazonaws.com/techbowl/T0BN2TZV4-U021VGZS4K0-bc18224a3777-512%20-%20Yuki%20Tamada.jpeg_1.jpeg", availability: "available" as const, recentTopics: ["クラウド構築", "コスト最適化"] },
  { name: "sakito", company: "外資IT", level: "初心者OK" as const, englishOk: true, skills: ["R", "Python", "統計"], catchphrase: "統計わからなくても大丈夫、一緒にやろう", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/f1b0b61d382836433f851e2915947279.jpg", availability: "full" as const, recentTopics: ["データ分析", "統計相談"] },
  { name: "Masaya", company: "Web系企業", level: "初心者OK" as const, englishOk: false, skills: ["Rails", "React", "PostgreSQL"], catchphrase: "Rails + React、最強の組み合わせ", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/d8418894b2f8b27050dbd7c11be1b4fa.jpg", availability: "available" as const, recentTopics: ["設計レビュー", "技術選定"] },
  { name: "Kaori", company: "スタートアップ", level: "Rank3以上" as const, englishOk: false, skills: ["Go", "AWS", "DDD"], catchphrase: "いいプロダクト作りについて語りましょう", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/b2b58fb1187d457b93835f8b1e5bfc1c.jpg", availability: "few" as const, recentTopics: ["DDD相談", "設計相談"] },
  { name: "Ayano", company: "フリーランス", level: "初心者OK" as const, englishOk: false, skills: ["Vue.js", "Nuxt", "Firebase"], catchphrase: "個人開発で月5万稼ぐ方法、教えます", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/aa063791a9bdc80b4c72740f526ef4b5.jpg", availability: "available" as const, recentTopics: ["個人開発", "収益化相談"] },
  { name: "Takuma", company: "メガベンチャー", level: "Rank3以上" as const, englishOk: true, skills: ["Kubernetes", "Istio", "GCP"], catchphrase: "サービスメッシュの話、ワクワクしませんか", avatarUrl: "https://techbowl-production.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/6f598c57494df4ddf926028a5f3f6cfc.png", availability: "available" as const, recentTopics: ["インフラ構築", "運用改善"] },
  { name: "tyamahori(ちゃまほり)", company: "大手IT", level: "Rank3以上" as const, englishOk: false, skills: ["ペネトレーション", "脆弱性診断", "AWS"], catchphrase: "ハッカー目線でコードを見る面白さ", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/d200c941bb150a74c8795293326a0eb6.jpg", availability: "full" as const, recentTopics: ["脆弱性診断", "セキュリティ"] },
  { name: "kazuto", company: "外資IT", level: "Rank3以上" as const, englishOk: true, skills: ["Scala", "Akka", "Kafka"], catchphrase: "関数型プログラミング、ハマると戻れない", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/4d97a0be276648e26113fbb10d633507.jpg", availability: "available" as const, recentTopics: ["設計相談", "性能改善"] },
  { name: "Kota", company: "Web系企業", level: "初心者OK" as const, englishOk: false, skills: ["Go", "gRPC", "MySQL"], catchphrase: "Go言語のシンプルさが好きです", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/a09ec3ea79fb3a024abfd4493cf794cf.jpg", availability: "available" as const, recentTopics: ["API設計", "DB設計"] },
  { name: "Hidemi Yukita", company: "スタートアップ", level: "初心者OK" as const, englishOk: false, skills: ["PdM", "UX", "Agile"], catchphrase: "ユーザーの声を聴くのが仕事です", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/485effe01fc34c81940465dcd01f0298.jpg", availability: "few" as const, recentTopics: ["UX改善", "チーム運営"] },
  { name: "ぷーじ", company: "フリーランス", level: "初心者OK" as const, englishOk: false, skills: ["Swift", "SwiftUI", "CoreData"], catchphrase: "SwiftUI最高！Apple好きな人、話しましょう", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/5440910aecb329ef5b6900b55afea1f6.jpg", availability: "available" as const, recentTopics: ["UI実装", "リリース相談"] },
  { name: "Shinjiro Echizen", company: "大手IT", level: "Rank3以上" as const, englishOk: false, skills: ["Java", "DDD", "マイクロサービス"], catchphrase: "設計って奥が深い。一緒に考えましょう", avatarUrl: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/00fb156d5b52c2a08e7f8874bf0c6013.jpg", availability: "available" as const, recentTopics: ["DDD相談", "コードレビュー"] },
];

// ── 所属タイプ ──
const companyTypes = [
  { id: "freelance", label: "フリーランス", match: (c: string) => c === "フリーランス" },
  { id: "startup", label: "スタートアップ", match: (c: string) => c === "スタートアップ" },
  { id: "mega", label: "メガベンチャー", match: (c: string) => c === "メガベンチャー" },
  { id: "enterprise", label: "大手IT", match: (c: string) => c.includes("大手") },
  { id: "foreign", label: "外資IT", match: (c: string) => c.includes("外資") },
  { id: "web", label: "Web系", match: (c: string) => c.includes("Web") },
];

// ── 得意領域 ──
const expertiseFilters = [
  { id: "design", label: "設計全般", match: (topics: string[]) => topics.some(t => ["アプリ設計", "API設計", "DB設計", "設計レビュー", "システム設計", "DDD相談", "コンポ設計", "CSS設計", "設計相談"].includes(t)) },
  { id: "infra", label: "インフラ/クラウド", match: (topics: string[]) => topics.some(t => ["インフラ構築", "クラウド構築", "IaC相談", "コスト最適化"].includes(t)) },
  { id: "devops", label: "CI/CD・DevOps", match: (topics: string[]) => topics.some(t => ["CI/CD改善", "環境構築", "自動化相談", "監視設計"].includes(t)) },
  { id: "ai", label: "AI/データ", match: (topics: string[]) => topics.some(t => ["AI活用相談", "モデル設計", "MLOps相談", "データ分析", "データ基盤", "統計相談", "SQL相談"].includes(t)) },
  { id: "career", label: "キャリア相談", match: (topics: string[]) => topics.some(t => ["キャリア相談", "個人開発", "収益化相談"].includes(t)) },
  { id: "security", label: "セキュリティ", match: (topics: string[]) => topics.some(t => ["脆弱性診断", "セキュリティ"].includes(t)) },
  { id: "ui", label: "UI/UX", match: (topics: string[]) => topics.some(t => ["UI実装", "UX改善", "デザイン相談", "UI設計"].includes(t)) },
  { id: "perf", label: "性能改善", match: (topics: string[]) => topics.some(t => ["性能改善", "障害対応", "運用改善"].includes(t)) },
  { id: "team", label: "チーム運営", match: (topics: string[]) => topics.some(t => ["チーム運営", "コードレビュー"].includes(t)) },
  { id: "release", label: "リリース相談", match: (topics: string[]) => topics.some(t => ["リリース相談", "技術選定"].includes(t)) },
];

// ── 空き状況 ──
const availabilityFilters = [
  { id: "available", label: "空いてる！" },
  { id: "few", label: "まだいける" },
];

export default function MentorList({ initialFilter, initialLevel, onFilterChange }: { initialFilter?: string | null; initialLevel?: string | null; onFilterChange?: (filter: string) => void } = {}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState<Set<string>>(
    initialFilter && initialFilter !== "すべて" ? new Set([initialFilter]) : new Set()
  );
  const [selectedLevel, setSelectedLevel] = useState<string | null>(initialLevel ?? null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<string | null>(null);
  const [selectedExpertise, setSelectedExpertise] = useState<Set<string>>(new Set());
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const DISPLAY_COUNT = 12;

  const toggleTech = (id: string) => {
    const next = new Set(selectedTech);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedTech(next);
    onFilterChange?.(next.size === 1 ? [...next][0] : "すべて");
  };

  const toggleExpertise = (id: string) => {
    const next = new Set(selectedExpertise);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedExpertise(next);
  };

  const hasActiveFilters = selectedTech.size > 0 || selectedLevel !== null || selectedCompany !== null || selectedAvailability !== null || selectedExpertise.size > 0;
  const activeFilterCount = selectedTech.size + (selectedLevel ? 1 : 0) + (selectedCompany ? 1 : 0) + (selectedAvailability ? 1 : 0) + selectedExpertise.size;

  const clearAll = () => {
    setSelectedTech(new Set());
    setSelectedLevel(null);
    setSelectedCompany(null);
    setSelectedAvailability(null);
    setSelectedExpertise(new Set());
    setShowAll(false);
    onFilterChange?.("すべて");
  };

  const availabilityOrder = { available: 0, few: 1, full: 2 } as const;

  const allFiltered = mentors
    .filter((m) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !m.name.toLowerCase().includes(q) &&
          !m.skills.some((s) => s.toLowerCase().includes(q)) &&
          !m.company.toLowerCase().includes(q) &&
          !m.catchphrase.toLowerCase().includes(q) &&
          !m.recentTopics.some((t) => t.toLowerCase().includes(q))
        ) return false;
      }
      if (selectedTech.size > 0) {
        if (!m.skills.some((s) => [...selectedTech].some((t) => s.toLowerCase().includes(t.toLowerCase())))) return false;
      }
      if (selectedLevel === "beginner" && m.level !== "初心者OK") return false;
      if (selectedLevel === "advanced" && m.level !== "Rank3以上") return false;
      if (selectedLevel === "english" && !m.englishOk) return false;
      if (selectedCompany) {
        const ct = companyTypes.find((c) => c.id === selectedCompany);
        if (ct && !ct.match(m.company)) return false;
      }
      if (selectedAvailability) {
        if (m.availability !== selectedAvailability) return false;
      }
      if (selectedExpertise.size > 0) {
        const matchesAny = [...selectedExpertise].some((eId) => {
          const ef = expertiseFilters.find((e) => e.id === eId);
          return ef?.match(m.recentTopics);
        });
        if (!matchesAny) return false;
      }
      return true;
    })
    .sort((a, b) => availabilityOrder[a.availability] - availabilityOrder[b.availability]);

  const displayMentors = showAll ? allFiltered : allFiltered.slice(0, DISPLAY_COUNT);

  return (
    <div>
      {/* ── 検索 + 絞り込みトグル ── */}
      <div className="flex items-center gap-2 mb-3">
        <input
          type="text"
          placeholder="メンター名・スキル・会社で検索"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-0 px-4 py-2 text-sm text-text-body placeholder-text-secondary bg-white border border-border-primary rounded-lg focus:outline-none focus:border-brand-primary"
        />
        <button
          type="button"
          onClick={() => setIsDetailOpen(!isDetailOpen)}
          className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer border ${
            isDetailOpen
              ? "bg-brand-primary text-white border-brand-primary"
              : hasActiveFilters
              ? "bg-brand-primary/5 text-brand-primary border-brand-primary"
              : "bg-white text-text-body border-border-primary hover:border-brand-primary hover:text-brand-primary"
          }`}
        >
          <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 4V6H20L15 13.5V22H9V13.5L4 6H3V4H21ZM6.404 6L11 12.894V20H13V12.894L17.596 6H6.404Z" />
          </svg>
          絞り込む
          {activeFilterCount > 0 && (
            <span className="text-[10px] font-bold text-white bg-brand-primary w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
            className={`transition-transform duration-200 ${isDetailOpen ? "rotate-180" : ""}`}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* ── 選択中のフィルター（閉じた状態でも表示） ── */}
      {!isDetailOpen && hasActiveFilters && (
        <div className="flex items-center gap-1.5 mb-3 flex-wrap">
          {[...selectedTech].map((t) => (
            <button key={t} type="button" onClick={() => toggleTech(t)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand-primary text-white cursor-pointer">
              {t}
              <svg width={10} height={10} viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.586L6.707 5.293 5.293 6.707 10.586 12 5.293 17.293 6.707 18.707 12 13.414 17.293 18.707 18.707 17.293 13.414 12 18.707 6.707 17.293 5.293 12 10.586Z" /></svg>
            </button>
          ))}
          {selectedLevel && (
            <button type="button" onClick={() => setSelectedLevel(null)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand-primary text-white cursor-pointer">
              {{ beginner: "初心者OK", advanced: "Rank3以上", english: "English OK" }[selectedLevel]}
              <svg width={10} height={10} viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.586L6.707 5.293 5.293 6.707 10.586 12 5.293 17.293 6.707 18.707 12 13.414 17.293 18.707 18.707 17.293 13.414 12 18.707 6.707 17.293 5.293 12 10.586Z" /></svg>
            </button>
          )}
          {selectedAvailability && (
            <button type="button" onClick={() => setSelectedAvailability(null)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-600 text-white cursor-pointer">
              {availabilityFilters.find((a) => a.id === selectedAvailability)?.label}
              <svg width={10} height={10} viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.586L6.707 5.293 5.293 6.707 10.586 12 5.293 17.293 6.707 18.707 12 13.414 17.293 18.707 18.707 17.293 13.414 12 18.707 6.707 17.293 5.293 12 10.586Z" /></svg>
            </button>
          )}
          {selectedCompany && (
            <button type="button" onClick={() => setSelectedCompany(null)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand-primary text-white cursor-pointer">
              {companyTypes.find((c) => c.id === selectedCompany)?.label}
              <svg width={10} height={10} viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.586L6.707 5.293 5.293 6.707 10.586 12 5.293 17.293 6.707 18.707 12 13.414 17.293 18.707 18.707 17.293 13.414 12 18.707 6.707 17.293 5.293 12 10.586Z" /></svg>
            </button>
          )}
          {[...selectedExpertise].map((eId) => (
            <button key={eId} type="button" onClick={() => toggleExpertise(eId)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-violet-600 text-white cursor-pointer">
              {expertiseFilters.find((e) => e.id === eId)?.label}
              <svg width={10} height={10} viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.586L6.707 5.293 5.293 6.707 10.586 12 5.293 17.293 6.707 18.707 12 13.414 17.293 18.707 18.707 17.293 13.414 12 18.707 6.707 17.293 5.293 12 10.586Z" /></svg>
            </button>
          ))}
          <button type="button" onClick={clearAll} className="text-[11px] text-text-description hover:text-brand-primary cursor-pointer ml-1">
            すべて解除
          </button>
        </div>
      )}

      {/* ── フィルターパネル（折りたたみ） ── */}
      <div className={`transition-all duration-200 ease-in-out overflow-hidden ${isDetailOpen ? "max-h-[800px] opacity-100 mb-4" : "max-h-0 opacity-0"}`}>
        <div className="bg-white border border-border-primary rounded-xl p-4 space-y-3">
          {/* 技術スキル */}
          <div>
            <h4 className="text-[11px] font-bold text-text-description mb-2">技術スキル</h4>
            <div className="flex flex-wrap gap-1.5">
              {techFieldFilters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => toggleTech(f.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] transition-all cursor-pointer border ${
                    selectedTech.has(f.id)
                      ? "bg-brand-primary text-white border-brand-primary font-bold"
                      : "bg-white text-text-body border-border-primary hover:border-brand-primary hover:text-brand-primary"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          {/* 得意領域 */}
          <div>
            <h4 className="text-[11px] font-bold text-text-description mb-2">得意領域</h4>
            <div className="flex flex-wrap gap-1.5">
              {expertiseFilters.map((ef) => (
                <button
                  key={ef.id}
                  type="button"
                  onClick={() => toggleExpertise(ef.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] transition-all cursor-pointer border ${
                    selectedExpertise.has(ef.id)
                      ? "bg-violet-600 text-white border-violet-600 font-bold"
                      : "bg-white text-text-body border-border-primary hover:border-violet-400 hover:text-violet-600"
                  }`}
                >
                  {ef.label}
                </button>
              ))}
            </div>
          </div>
          {/* レベル */}
          <div>
            <h4 className="text-[11px] font-bold text-text-description mb-2">レベル</h4>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "beginner", label: "初心者OK" },
                { id: "advanced", label: "Rank3以上" },
                { id: "english", label: "English OK" },
              ].map((lv) => (
                <button
                  key={lv.id}
                  type="button"
                  onClick={() => setSelectedLevel(selectedLevel === lv.id ? null : lv.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] transition-all cursor-pointer border ${
                    selectedLevel === lv.id
                      ? "bg-brand-primary text-white border-brand-primary font-bold"
                      : "bg-white text-text-body border-border-primary hover:border-brand-primary hover:text-brand-primary"
                  }`}
                >
                  {lv.label}
                </button>
              ))}
            </div>
          </div>
          {/* 空き状況 */}
          <div>
            <h4 className="text-[11px] font-bold text-text-description mb-2">空き状況</h4>
            <div className="flex flex-wrap gap-1.5">
              {availabilityFilters.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => setSelectedAvailability(selectedAvailability === av.id ? null : av.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] transition-all cursor-pointer border ${
                    selectedAvailability === av.id
                      ? "bg-green-600 text-white border-green-600 font-bold"
                      : "bg-white text-text-body border-border-primary hover:border-green-500 hover:text-green-600"
                  }`}
                >
                  {av.label}
                </button>
              ))}
            </div>
          </div>
          {/* 所属タイプ */}
          <div>
            <h4 className="text-[11px] font-bold text-text-description mb-2">所属タイプ</h4>
            <div className="flex flex-wrap gap-1.5">
              {companyTypes.map((ct) => (
                <button
                  key={ct.id}
                  type="button"
                  onClick={() => setSelectedCompany(selectedCompany === ct.id ? null : ct.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] transition-all cursor-pointer border ${
                    selectedCompany === ct.id
                      ? "bg-brand-primary text-white border-brand-primary font-bold"
                      : "bg-white text-text-body border-border-primary hover:border-brand-primary hover:text-brand-primary"
                  }`}
                >
                  {ct.label}
                </button>
              ))}
            </div>
          </div>
          {/* リセット */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-border-primary">
              <span className="text-xs text-text-body"><span className="font-bold text-brand-primary">{allFiltered.length}名</span> が該当</span>
              <button type="button" onClick={clearAll} className="text-xs text-text-description hover:text-brand-primary cursor-pointer">条件をリセット</button>
            </div>
          )}
        </div>
      </div>

      {/* ── メンター一覧 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {displayMentors.map((mentor) => (
          <MentorCard key={mentor.name} {...mentor} />
        ))}
      </div>
      {displayMentors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-description text-sm">条件に合うメンターが見つかりませんでした</p>
          <button type="button" onClick={clearAll} className="mt-2 text-sm text-brand-primary hover:underline cursor-pointer">条件をリセットする</button>
        </div>
      )}
      {!showAll && allFiltered.length > DISPLAY_COUNT && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-primary hover:underline cursor-pointer"
          >
            <span>もっと見る（他{allFiltered.length - DISPLAY_COUNT}名）</span>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mt-px">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
