import {baseUrl} from "./config.js"
export function topList(){
	// 
	// 	uni.request({
	// 	url:'${baseUrl}/toplist/detail',
	// 	method:'GET',
	// 	data:{},
	// 	success: res => {
	// 	let result=res.data.list;
	// 	result.length = 4;
	// 	reslove(result);	
	// 	console.log(res);
	// 	},
	// 	fail: () => {},
	// 	complete: () => {}
	// 	});
	// });
	
	// 19723756飙升榜id  3779629新歌榜  2884035原创榜  热歌榜3778678
	var listIds =[19723756,3779629,2884035,3778678,71385702];
	return new Promise(function(resolve,reject){
			uni.request({
				url: `https://netease-cloud-music-api-three-rho.vercel.app/toplist/detail`,
				method: 'GET',
				data: {},
				success: res => {
					let result = res.data.list;
					result.length = 4;
					for(let i=0;i<result.length;i++){
						result[i].listId = listIds[i];
					}
					resolve(result);
				},
				fail: (err) => {
					console.log(err);
				},
				complete: () => {}
			});
		});
	}
	
	export function list(listId){
		return uni.request({
			url: `https://netease-cloud-music-api-three-rho.vercel.app/playlist/detail?id=${listId}`,
			method: 'GET'
		});
	}
	export function songDetail(id){
		return uni.request({
			url : `https://netease-cloud-music-api-three-rho.vercel.app/song/detail?ids=${id}`,
			method : 'GET'
		})
	}
export function songUrl(id){
	return uni.request({
		url : `https://netease-cloud-music-api-three-rho.vercel.app/song/url?id=${id}`,
		method : 'GET'
	})
}
export function songLyric(id){
	return uni.request({
		url : `https://netease-cloud-music-api-three-rho.vercel.app/lyric?id=${id}`,
		method : 'GET'
	})
}

export function songSimi(id){
	return uni.request({
		url : `https://netease-cloud-music-api-three-rho.vercel.app/simi/song?id=${id}`,
		method : 'GET'
	})
}

export function songComment(id){
	return uni.request({
		url : `https://netease-cloud-music-api-three-rho.vercel.app/comment/music?id=${id}`,
		method : 'GET'
	})
}
export function searchHot(){
	return uni.request({
		url : `https://netease-cloud-music-api-three-rho.vercel.app/search/hot/detail`,
		method : 'GET'
	})
}

export function searchWord(word){
	return uni.request({
		url : `https://netease-cloud-music-api-three-rho.vercel.app/search?keywords=${word}`,
		method : 'GET'
	})
}

export function searchSuggest(word){
	return uni.request({
		url : `https://netease-cloud-music-api-three-rho.vercel.app/search/suggest?keywords=${word}&type=mobile`,
		method : 'GET'
	})
}

