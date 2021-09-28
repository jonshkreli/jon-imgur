import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders user data", async () => {
    const fakeImage = {
        "id": "F3KHDt9",
        "title": "Grow up",
        "description": null,
        "datetime": 1632692005,
        "cover": "bl82iKF",
        "cover_width": 750,
        "cover_height": 747,
        "account_url": "MrMrsCrowley",
        "account_id": 154625049,
        "privacy": "hidden",
        "layout": "blog",
        "views": 74001,
        "link": "https:\/\/imgur.com\/a\/F3KHDt9",
        "ups": 1195,
        "downs": 15,
        "points": 1180,
        "score": 1216,
        "is_album": true,
        "vote": null,
        "favorite": false,
        "nsfw": false,
        "section": "",
        "comment_count": 45,
        "favorite_count": 112,
        "topic": null,
        "topic_id": null,
        "images_count": 1,
        "in_gallery": true,
        "is_ad": false,
        "tags": [
            {
                "name": "funny",
                "display_name": "funny",
                "followers": 5916921,
                "total_items": 2696534,
                "following": false,
                "is_whitelisted": false,
                "background_hash": "9r1qCDq",
                "thumbnail_hash": null,
                "accent": "633875",
                "background_is_animated": false,
                "thumbnail_is_animated": false,
                "is_promoted": false,
                "description": "LOLs, ROFLs, LMAOs",
                "logo_hash": null,
                "logo_destination_url": null,
                "description_annotations": {}
            },
            {
                "name": "boyfriend",
                "display_name": "boyfriend",
                "followers": 770,
                "total_items": 612,
                "following": false,
                "is_whitelisted": false,
                "background_hash": "YDS5rp4",
                "thumbnail_hash": null,
                "accent": "24565E",
                "background_is_animated": false,
                "thumbnail_is_animated": false,
                "is_promoted": false,
                "description": "",
                "logo_hash": null,
                "logo_destination_url": null,
                "description_annotations": {}
            },
            {
                "name": "girlfriend",
                "display_name": "girlfriend",
                "followers": 2177,
                "total_items": 1472,
                "following": false,
                "is_whitelisted": false,
                "background_hash": "gmFssAG",
                "thumbnail_hash": null,
                "accent": "51535A",
                "background_is_animated": false,
                "thumbnail_is_animated": false,
                "is_promoted": false,
                "description": "",
                "logo_hash": null,
                "logo_destination_url": null,
                "description_annotations": {}
            },
            {
                "name": "memes",
                "display_name": "memes",
                "followers": 2556399,
                "total_items": 557386,
                "following": false,
                "is_whitelisted": false,
                "background_hash": "1z4dgZT",
                "thumbnail_hash": null,
                "accent": "ba519f",
                "background_is_animated": false,
                "thumbnail_is_animated": false,
                "is_promoted": false,
                "description": "the freshest memes",
                "logo_hash": null,
                "logo_destination_url": null,
                "description_annotations": {}
            }
        ],
        "ad_type": 0,
        "ad_url": "",
        "in_most_viral": true,
        "include_album_ads": false,
        "images": [
            {
                "id": "bl82iKF",
                "title": null,
                "description": null,
                "datetime": 1632691925,
                "type": "image\/jpeg",
                "animated": false,
                "width": 750,
                "height": 747,
                "size": 88231,
                "views": 30215,
                "bandwidth": 2665899665,
                "vote": null,
                "favorite": false,
                "nsfw": null,
                "section": null,
                "account_url": null,
                "account_id": null,
                "is_ad": false,
                "in_most_viral": false,
                "has_sound": false,
                "tags": [],
                "ad_type": 0,
                "ad_url": "",
                "edited": "0",
                "in_gallery": false,
                "link": "https:\/\/i.imgur.com\/bl82iKF.jpg",
                "comment_count": null,
                "favorite_count": null,
                "ups": null,
                "downs": null,
                "points": null,
                "score": null
            }
        ],
        "ad_config": {
            "safeFlags": [
                "album",
                "in_gallery",
                "sixth_mod_safe",
                "gallery"
            ],
            "highRiskFlags": [],
            "unsafeFlags": [],
            "wallUnsafeFlags": [],
            "showsAds": true
        }
    }
    jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({json: () => Promise.resolve(fakeImage)}));
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
        const {id, title, link, description, images, ups, downs, score} = fakeImage
        render(<div key={id} className={"card"} onClick={() => onImageCardClick({id, title, link, description, images, ups, downs, score})}>
            <img className={"thumbnail"} src={images?.[0]?.link} alt=""/>
            <p>{description}</p>
        </div>, container);
    });

    expect(container.querySelector(".card p").textContent).toBe(fakeImage.description || "");
    expect(container.querySelector(".thumbnail").getAttribute("src")).toBe(fakeImage.images?.[0]?.link);

// remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});
