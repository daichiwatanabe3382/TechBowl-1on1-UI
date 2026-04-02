"use client";

import { useState } from "react";
import MentorCard from "./MentorCard";

const filterOptions = ["すべて", "Go", "React", "TypeScript", "Python", "AWS", "Java", "Ruby", "Docker", "Kubernetes"] as const;
const sortOptions = ["おすすめ順", "初心者OK順", "English OK順"] as const;

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

export default function MentorList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("すべて");
  const [activeSort, setActiveSort] = useState<string>("おすすめ順");

  const availabilityOrder = { available: 0, few: 1, full: 2 } as const;

  const filtered = mentors
    .filter((m) => {
      const matchesSearch =
        searchQuery === "" ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.skills.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFilter =
        activeFilter === "すべて" ||
        m.skills.some((t) => t.toLowerCase() === activeFilter.toLowerCase());
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => availabilityOrder[a.availability] - availabilityOrder[b.availability]);

  return (
    <div>
      {/* Search */}
      <input
        type="text"
        placeholder="メンターを検索"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2.5 text-sm text-text-body placeholder-text-secondary bg-white border border-border-primary rounded-lg focus:outline-none focus:border-brand-primary mb-4"
      />

      {/* Filter & Sort Dropdowns */}
      <div className="flex items-center gap-3 mb-6">
        {/* 絞り込む */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setFilterOpen(!filterOpen); setSortOpen(false); }}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-text-body border border-border-secondary rounded-full hover:bg-bg-quaternary transition-colors cursor-pointer"
          >
            絞り込む
            <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 16L6 10H18L12 16Z" />
            </svg>
          </button>
          {filterOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setFilterOpen(false)} />
              <div className="absolute top-full left-0 mt-1 z-20 bg-white border border-border-secondary rounded-xl shadow-lg py-1 min-w-[160px]">
                {filterOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { setActiveFilter(opt); setFilterOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${
                      activeFilter === opt
                        ? "text-brand-primary font-bold bg-bg-quaternary"
                        : "text-text-body hover:bg-bg-quaternary"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* おすすめ順 */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setSortOpen(!sortOpen); setFilterOpen(false); }}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-text-body border border-border-secondary rounded-full hover:bg-bg-quaternary transition-colors cursor-pointer"
          >
            {activeSort}
            <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 16L6 10H18L12 16Z" />
            </svg>
          </button>
          {sortOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
              <div className="absolute top-full left-0 mt-1 z-20 bg-white border border-border-secondary rounded-xl shadow-lg py-1 min-w-[160px]">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { setActiveSort(opt); setSortOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${
                      activeSort === opt
                        ? "text-brand-primary font-bold bg-bg-quaternary"
                        : "text-text-body hover:bg-bg-quaternary"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mentor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {filtered.map((mentor) => (
          <MentorCard key={mentor.name} {...mentor} />
        ))}
      </div>
    </div>
  );
}
