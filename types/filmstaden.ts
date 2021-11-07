export interface Attribute {
  alias: string;
  displayName: string;
  description: string;
}

export interface SubtitlesLanguageInfo {
  displayName: string;
  alias: string;
  name: string;
  threeLetterISOLanguageName: string;
  description: string;
}

export interface AudioLanguageInfo {
  displayName: string;
  alias: string;
  name: string;
  threeLetterISOLanguageName: string;
  description: string;
}

export interface AudioLanguage {
  displayName: string;
  alias: string;
  name: string;
  threeLetterISOLanguageName: string;
  description: string;
}

export interface Rating {
  displayName: string;
  alias: string;
  age: number;
  ageAccompanied: number;
}

export interface Version {
  ncgId: string;
  movieNcgId: string;
  remoteSystemAlias: string;
  remoteEntityId: string;
  title: string;
  slug: string;
  attributes: Attribute[];
  subtitlesLanguageInfo: SubtitlesLanguageInfo;
  audioLanguageInfo: AudioLanguageInfo;
  audioLanguages: AudioLanguage[];
  rating: Rating;
  partnerShow: boolean;
  partnerCode?: any;
}

export interface Rating2 {
  displayName: string;
  alias: string;
  age: number;
  ageAccompanied: number;
}

export interface Alternative {
  contentType: string;
  url: string;
}

export interface Image {
  id: string;
  imageType: string;
  contentType: string;
  url: string;
  alternatives: Alternative[];
}

export interface VideoStream {
  category: string;
  url: string;
  description: string;
  image?: any;
}

export interface Genre {
  name: string;
}

export interface Item {
  versions: Version[];
  ncgId: string;
  title: string;
  slug: string;
  releaseDate: Date;
  releaseDateInfo?: any;
  preReleaseDate?: any;
  preReleaseDateInfo?: any;
  reReleaseDate?: any;
  reReleaseDateInfo?: any;
  rating: Rating2;
  posterUrl: string;
  length: number;
  specialMovie: boolean;
  images: Image[];
  videoStreams: VideoStream[];
  genres: Genre[];
}

export interface RootObject {
  totalNbrOfItems: number;
  items: Item[];
}
