<template>
	<view class="search">
		<musichead title="搜索" :icon="true" :iconBlack="true"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="search-search">
					<text class="iconfont iconsearch"></text>
					<input type="text" placeholder="搜索歌曲" v-model="searchWord" 
					@confirm="handleToSearch"  @input="handleToSuggest" />
					<!-- 监听点击搜索按钮的事件 -->
					<text v-show="searchType == 2" @tap="handleToClose" class="iconfont iconguanbi"></text>
				</view>
				<block v-if="searchType == 1">
					<view class="search-history">
						<view class="search-history-head">
							<text>历史记录</text>
							<text class="iconfont iconlajitong" @tap="handleToClear"></text>
						</view>
						<view class="search-history-list">
							<view v-for="(item,index) in historyList" :key="index" 
							@tap="handleToWord(item)">{{ item }}</view>
							<!-- handleToWord传递搜索的值 -->
						</view>
					</view>
					<view class="search-hot">
						<view class="search-hot-title">热搜榜</view>
				
						<view class="search-hot-item" v-for="(item,index) in searchHot" :key="index" 
						@tap="handleToWord(item.searchWord)">
						<!-- item指的就是循环中的元素本身，index则是元素的索引值 -->
							<view class="search-hot-top">{{ index + 1 }}</view>
							<view class="search-hot-word">
								<view>
									{{ item.searchWord }} <!-- 歌手 --><image :src="item.iconType ? item.iconUrl : ''
									" mode="aspectFit"></image><!-- 图标-->
								</view>
								<view>{{ item.content }}</view>
							</view>
							<text class="search-hot-count">{{ item.score }}</text>
						</view>
					</view>
				</block>
				<block v-else-if="searchType == 2">
					<view class="search-result">
				
						<view class="search-result-item" v-for="(item,index) in searchList" :key="index" 
						@tap="handleToDetail(item.id)">
							<view class="search-result-word">
								<view>{{ item.name }}</view>
								<view>{{ item.artists[0].name }} - {{ item.album.name }}</view>
							</view>
							<text class="iconfont iconbofang"></text>
						</view>
					</view>
				</block>
				<!-- 搜索提示 -->
				<block v-else-if="searchType == 3">
					<view class="search-suggest">
						<view class="search-suggest-title">搜索"{{ this.searchWord }}"</view>
					
						<view class="search-suggest-item" v-for="(item,index) in suggestList" :key="index" 
						@tap="handleToWord(item.keyword)">
							<text class="iconfont iconsearch"></text>
							{{ item.keyword }}
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { searchHot , searchWord , searchSuggest } from '../../common/api.js'// 引入接口
	import '@/common/iconfont.css'
	export default {
		data() {
			return {
				searchHot : [],
				searchWord : '',
				historyList : [],
				searchType : 1,//切换显示区域
				searchList : [],
				suggestList : []
			}
		},
		onLoad(){
			searchHot().then((res)=>{
				if(res[1].data.code == '200'){
					this.searchHot = res[1].data.data;// 获取20个数组
				}
			});
			uni.getStorage({
			    key: 'searchHistory',
			    success:(res)=>{
			        this.historyList = res.data;
			    }
			});
		},
		methods: {
			handleToSearch(){
				this.historyList.unshift(this.searchWord);
				this.historyList = [...new Set(this.historyList)];//去掉重复历史
				if(this.historyList.length > 10){
					this.historyList.length = 10;
				}//最多保留十个历史
				uni.setStorage({
				    key: 'searchHistory',
				    data: this.historyList  //存储的内容
				});
				this.getSearchList(this.searchWord);
			},
			handleToClear(){
				uni.removeStorage({
					key:'searchHistory',
					success:()=>{
						this.historyList = [];
					}
				});
			},// 清除历史记录
			getSearchList(word){
				searchWord(word).then((res)=>{
					if(res[1].data.code == '200'){
						this.searchList = res[1].data.result.songs;
						this.searchType = 2;
					}
				});
			},//得到搜索记录
			handleToClose(){
				this.searchWord = '';
				this.searchType = 1;
			},//关闭记录
			handleToSuggest(ev){
				let value = ev.detail.value;
				if(!value){
					this.searchType = 1;
					return;
				}
				searchSuggest(value).then((res)=>{
					if(res[1].data.code == '200'){
						this.suggestList = res[1].data.result.allMatch;
						this.searchType = 3;
					}
				});//搜索页下拉提示
			},
			handleToWord(word){
				this.searchWord = word;   //点击热搜榜后出现在搜索框
				this.handleToSearch();
			},
			handleToDetail(songId){
				uni.navigateTo({
					url: '/pages/detail/detail?songId='+songId
				});
			}//跳转到详情页，
		}
	}
</script>

<style scoped>
	/* 搜索 */
	@import url("../../common/iconfont.css");
	.search-search{ display: flex; background:#f7f7f7; height:73rpx; 
	margin:28rpx 30rpx 30rpx 30rpx; border-radius: 50rpx; align-items: center;} 
	.search-search text{ margin:0 27rpx;} 
	.search-search input{ font-size:26rpx; flex:1;}
	
	/* 历史记录 */
	.search-history{ margin:0 30rpx; font-size:26rpx;}
	.search-history-head{ display: flex; justify-content: space-between;}
	 /*flex让所有弹性盒模型对象的子元素都有相同的长度
	  justify-content在弹性盒对象的 <div> 元素中的各项周围留有空白： */
	.search-history-list{ display: flex; margin-top:36rpx; flex-wrap: wrap;}
	.search-history-list view{ padding:20rpx 40rpx; background:#f7f7f7; 
	border-radius: 50rpx; margin-right:30rpx; margin-bottom: 20rpx;}
	
	.search-hot{ margin:30rpx 30rpx; font-size:26rpx; color:#bebebe;}
	.search-hot-title{}
	.search-hot-item{ display: flex; align-items: center; margin-top: 40rpx;}
	.search-hot-top{ width:60rpx; color:#fb2221; font-size:34rpx;}
	.search-hot-word{ flex:1;}
	.search-hot-word view:nth-child(1){ font-size:36rpx; color:black;}
	.search-hot-word image{ width:48rpx; height:22rpx;}
	.search-hot-count{}
	
	.search-result{ border-top: 2rpx #e5e5e5 solid; padding:30rpx;}
	.search-result-item{ display: flex; align-items: center; 
	border-bottom: 2rpx #e5e5e5 solid; padding-bottom:30rpx; margin-bottom: 30rpx;}
	.search-result-item text{ font-size:50rpx;}
	.search-result-word{ flex:1;}
	.search-result-word view:nth-child(1){ font-size:28rpx; color:#3e6694;}
	.search-result-word view:nth-child(2){ font-size:26rpx;}
	
	.search-suggest{ border-top: 2rpx #e5e5e5 solid; padding:30rpx; font-size:26rpx; }
	.search-suggest-title{ color:#537caa; margin-bottom: 40rpx;}
	.search-suggest-item{ color:#666666; margin-bottom: 70rpx;}
	.search-suggest-item text{ color:#c2c2c2; font-size:26rpx; margin-right:26rpx;}
</style>
