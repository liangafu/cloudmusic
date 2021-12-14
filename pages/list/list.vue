<template>
	
	<view class="list">
	<view class="fixbg" :style="{'background-image':'url('+playlist.coverImgUrl+')'}"></view>
	<musicheader title="歌单" :icon="true"></musicheader>
	<view class=" container">
		<scroll-view scroll-y="true">
			<view class="list-head">
				<view class="list-head-img">
				<image :src="playlist.coverImgUrl" mode="" ></image>
				<text class="iconfont icon-yousanjiao" >{{ playlist.playCount | formatCount }}</text>
				</view>
				<view class="list-head-text" >
				<view>{{ playlist.name }}</view>
				<view>
				<image :src="playlist.creator.avatarUrl" mode="" ></image>
				{{playlist.creator.nickname}}
				</view>
				<view>
				{{ playlist.description }}
				</view>
				</view>
			</view>
			
			<view class="list-music">
			<view class="list-music-item" v-for="(item,index) in playlist.tracks" :key="item.id" @tap="handleToDetail(item.id)">
				<view class="list-music-top">{{ index + 1 }}</view>
				<view class="list-music-song">
					<view>{{ item.name }}</view>
					<view>
						<image v-if=" privileges[index].flag > 60 && privileges[index].flag < 70" src="../../static/dujia.png" mode=""></image>
						<image v-if="privileges[index].maxbr == 999000" src="../../static/sq.png" mode=""></image>
						{{ item.ar[0].name }} - {{ item.name }}
					</view>
				</view>
					<text class=" iconfont icon-bofang"></text>
					</view>
			</view>
		</scroll-view>
	</view>
	</view>
</template>

<script>
	import {list} from '../../common/api.js'
	import '@/common/iconfont.css'
	import musicheader from '../../components/musicheader/musicheader.vue'
	export default {
		data() {
			return {
			playlist : {
					coverImgUrl : '',
					trackCount : '',
					creator : ''
				},
				privileges : [],
				isShow : false
			}
		},
		comments:{
			musicheader
		},
		onLoad(options) {
		let listId = options.listId;
		list(listId).then((res)=>{
			console.log(res)
			if(res[1].data.code == '200'){
				this.playlist = res[1].data.playlist;
				this.privileges = res[1].data.privileges;
				
				this.isShow = true;
			}
			else{console.log(options.id+"失败")}
		});
		
		},
		comments:{
			musicheader
		},
		methods: {
		handleToDetail(songId){
				uni.navigateTo({
					url: '/pages/detail/detail?songId=' + songId
				});
			}
		}
	}
</script>

<style scoped>
	@import url("../../common/iconfont.css");
	.list-head{ display: flex; margin:30rpx;}
	.list-head-img{ width: 264rpx; height: 264rpx; border-radius: 30rpx; overflow: hidden; position: relative; margin-right :42rpx;}
	.list-head-img image{ width:100%; height :100%}
	.list-head-img text{ position: absolute; right:8rpx; top:8rpx; color :white; font-size:26rpx;}
	.list-head-text{ flex:1; color :#f0f2f7; }
	.list-head-text view:nth-child(1){ color :white; font-size:34rpx;}
	.list-head-text view:nth-child(2){ display: flex; margin:20rpx 0; font-size:24rpx; align-items: center; }
	.list-head-text view:nth-child(2) image{ width:54rpx; height:54rpx; border-radius: 50%; margin-right:14rpx;}
	.list-head-text view:nth-child(3){ line-height: 34rpx; font-size:22rpx;}

	.list-music{ background: white; border-radius: 50rpx; margin-top:40rpx; overflow: hidden; }
	.list-music-head{ height:50rpx; margin:30rpx 0 70rpx 22rpx;}
	.list-music-head text:nth-child(1){ height:50rpx; font-size:50rpx;}
	.list-music-head text:nth-child(2){ font-size:30rpx; margin:0 10rpx 0 26rpx;}
	.list-music-head text:nth-child(3){ font-size:26rpx; color :#b2b2b2; }
	.list-music-item{ display: flex; margin: 0 32rpx 66rpx 46rpx; align-items: center; color:#959595;}
	.list-music-top{ width:58rpx; font-size:30rpx; line-height:30rpx;}
	.list-music-song{ flex:1; }
	.list-music-song view:nth-child(1){ font-size:28rpx; color:black;} 
	.list-music-song view:nth-child(2){ display: flex; font-size:20rpx; align-items: center;}
	.list-music-song view:nth-child(2) image{ width:32rpx; height:20rpx; margin-right:10rpx; }
	.list-music-item text{ font-size:20rpx; color:#c7c7c7;}

</style>
