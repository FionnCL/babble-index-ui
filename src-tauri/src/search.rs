pub mod search {

    struct Url {
        #[serde(rename = "type")]
        kind: String,
        template: String
    }

    struct PreviousPage {
        title: String,
        totalResults: String,
        searchTerms: String,
        count: i32,
        startIndex: i32,
        startPage: i32,
        language: String,
        inputEncoding: String,
        outputEncoding: String,
        safe: String,
        cx: String,
        sort: String,
        filter: String,
        gl: String,
        cr: String,
        googleHost: String,
        disableCnTwTranslation: String,
        hq: String,
        hl: String,
        siteSearch: String,
        siteSearchFilter: String,
        exactTerms: String,
        excludeTerms: String,
        linkSite: String,
        orTerms: String,
        relatedSite: String,
        dateRestrict: String,
        lowRange: String,
        highRange: String,
        fileType: String,
        rights: String,
        searchType: String,
        imgSize: String,
        imgType: String,
        imgColorType: String,
        imgDominantColor: String
    }

    struct Queries {
        previousPage: Vec<PreviousPage>,
        request: Vec<Request>,
        nextPage: Vec<NextPage>,
            }

    struct Request {
        title: String,
        totalResults: String,
        searchTerms: String,
        count: i32,
        startIndex: i32,
        startPage: i32,
        language: String,
        inputEncoding: String,
        outputEncoding: String,
        safe: String,
        cx: String,
        sort: String,
        filter: String,
        gl: String,
        cr: String,
        googleHost: String,
        disableCnTwTranslation: String,
        hq: String,
        hl: String,
        siteSearch: String,
        siteSearchFilter: String,
        exactTerms: String,
        excludeTerms: String,
        linkSite: String,
        orTerms: String,
        relatedSite: String,
        dateRestrict: String,
        lowRange: String,
        highRange: String,
        fileType: String,
        rights: String,
        searchType: String,
        imgSize: String,
        imgType: String,
        imgColorType: String,
        imgDominantColor: String
    }

    struct NextPage  {
        title: String,
        totalResults: String,
        searchTerms: String,
        count: i32,
        startIndex: i32,
        startPage: i32,
        language: String,
        inputEncoding: String,
        outputEncoding: String,
        safe: String,
        cx: String,
        sort: String,
        filter: String,
        gl: String,
        cr: String,
        googleHost: String,
        disableCnTwTranslation: String,
        hq: String,
        hl: String,
        siteSearch: String,
        siteSearchFilter: String,
        exactTerms: String,
        excludeTerms: String,
        linkSite: String,
        orTerms: String,
        relatedSite: String,
        dateRestrict: String,
        lowRange: String,
        highRange: String,
        fileType: String,
        rights: String,
        searchType: String,
        imgSize: String,
        imgType: String,
        imgColorType: String,
        imgDominantColor: String
    }

    struct BodyLine {
        title: String,
        htmlTitle: String,
        url: String,
        link: String
    }

    struct Image {
        source: String,
        width: i32,
        height: i32
    }

    struct Promotion {
        title: String,
        htmlTitle: String,
        link: String,
        displayLink: String,
        bodyLines: Vec<BodyLines>,
        image: Image 
    }

    struct Context {}

    struct SearchInformation {
        searchTime: i32,
        formattedSearchTime: String,
        totalResults: String,
        formattedTotalResults: String
    }

    struct Spelling {
        correctedQuery: String,
        htmlCorrectedQuery: String
    }

    struct PageMap {}

    struct ItemImage {
        contextLink: String,
        height: i32,
        width: i32,
        byteSize: i32,
        thumbnailLink: String,
        thumbnailHeight: i32,
        thumbnailWidth: i32
    }

    struct Label {
        name: String,
        displayName: String,
        label_with_op: String
    }

    struct Item {
        kind: String,
        title: String,
        htmlTitle: String,
        link: String,
        displayLink: String,
        snippet: String,
        htmlSnippet: String,
        cacheId: String,
        formattedUrl: String,
        htmlFormattedUrl: String,
        pagemap: PageMap,
        mime: String,
        fileFormat: String,
        image: ItemImage,
        labels: Vec<Label>    
    }

    #[serde(Serialize, Deserialize)]
    pub struct dto {
        kind: String,
        url: Url,
        queries: Query,
        promotions: Vec<Promotion>,
        context: Context,
        searchInformation: SearchInformation,
        spelling: Spelling,
        items: Vec<Item> 
    }
}
