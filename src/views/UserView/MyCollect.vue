<template>
  <el-card class="content" style="height: auto">
    <div slot="header" class="clearfix">
      <span style="font-size:1.5rem">我的收藏</span>
    </div>
    <div v-if="noneCollect" class="noneCollect">
      你还没有收藏哦,快去找些优质文章吧！
    </div>
    <div v-else class="myCollectA" v-for="(item,index) in collectList" :key="index">
      <div class="myCollectTitle" @click="goToDetailView(item.id)">
        <div class="title">{{ item.title }}</div>
        <!--        <div class="description">{{ item.description }}</div>-->
        <div class="releaseTime">{{ item.releaseTime }}</div>
      </div>
      <div class="myCollectStar">
        <el-button type="danger" icon="el-icon-delete" circle @click="deleteCollection(item.id)"></el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import {delCollection, postDetailById, userCollection} from '../../network/any'

export default {
  name: 'MyCollect',
  data () {
    return {
      collectList: [],
      collectStar1: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiPiAgPGltYWdlIGlkPSJpbWFnZTAiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeD0iMCIgeT0iMCIKICAgIGhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ0FBQUFBZ0NBTUFBQUJFcElyR0FBQUFCR2RCVFVFQUFMR1BDL3hoQlFBQUFDQmpTRkpOCkFBQjZKZ0FBZ0lRQUFQb0FBQUNBNkFBQWRUQUFBT3BnQUFBNm1BQUFGM0NjdWxFOEFBQUJMMUJNVkVYLy8vLy96SGIvekhiL3kzYi8KekhiL3pKbi96WGIvekhmLzFZRC95M2IvekhiLzBYYi96WFgvejREL3kzYi96SGIveklEL3kzYi96SGYveklEL3pIWC8ySGIvekhiLwp5M2YvLzRELzBIbi96SGIveTNYL3pYYi8vNnIvMzREL3puYi96WGYvekhiL3kzYi96SFgveTNYL3kzYi96SGIvekhmL3puZi96WGIvCnkzYi95M1gvekhiL3pIZi96WGovelhiL3pIWC95M2IvekhYL3pIYi8wWGIveTNYL3pYai95M24vekhuL3kzYi95M1gvelhqLzBIai8KekhYL3ozci8wWHIvekhYL3pIZi96SG4vekhiL3pubi8wWUQvelhYL3puai96SFgvekhiL3pIYi8wWXYvekhiL3pIWC8vNEQveTNiLwp6blgvem52L3puYi95M2IvMjVMLzFZRC96SFgvMG5qL3pYWC96SGIvekhmLzQ0Ny95M1gvekhYLzI0RC96SGYveTNiL3kzYi96SGIvCnkzWC8vLzk5R2ZheUFBQUFZM1JTVGxNQWZlcnNqUVYxa0JqMytSeUpFUEwxRkh1REN1OE5ibllDSnVIbktRTUlOR1dWeGZUMnk1eHQKUG1iTy9OdHlVWERjM2E2ckovRWtPemMyN1RNeDZ6QXM2UzBvN2lvV1RFU3FvTm9ML2ZnRTQySWZHdWdIQnY0Um1IZDRDYzk4RGcrQQoxSnVzMXBSK0FBQUFBV0pMUjBRQWlBVWRTQUFBQUFkMFNVMUZCK1FIQWhVWE9vQksyeEFBQUFFWFNVUkJWRGpMWTJCQUFZeE16Q3lzCkRMZ0JXeklRc09PVzUrQUVLZURpeHFtQUp6a1pyeEc4ZkJBRi9BSTRGQWdtUTRFUWRubGhKcGdDRVZHc0NzU1M0VUFjaTdTRXBCUkMKZ2JTTUxMS2NuTHlDb3BKeU1ncFFVVlZUMStBRlMydHFhU2ZqQWpxNkRBeDZ5WGlCUG9NQmZnV0dEQ3I0RmFnd0dPRlhZTXhnb294UAozdFNNZ2NIY0ZMZThpQVhJbjVZaXVPU3RyQ0VCWmNPTVhkN1dEaGFVOWc3WTVCMGNFWUh0aE1VV1p4Zms2TERDWWdDeVBEYzJLMXlSCkZMaGhVK0NPTGJFaEExMGtCUjdZRkhnaUtmRENwa0FMSWUvdGcwMkJyeDljZ1NOYzBGOHpBSkUwQStFS2dxQWl3V0loREF5aDZzRVEKWGxnNHdvNElrQUJ6cERBMGcwUTVnL2pJT1RCYWpTa21OZzdCajA5SUZFa0tBVE1CV3Zqa0kxUmlUaDhBQUFBbGRFVllkR1JoZEdVNgpZM0psWVhSbEFESXdNakF0TURjdE1ESlVNVE02TWpNNk5UZ3JNRGc2TUREc0p5OU1BQUFBSlhSRldIUmtZWFJsT20xdlpHbG1lUUF5Ck1ESXdMVEEzTFRBeVZERXpPakl6T2pVNEt6QTRPakF3blhxWDhBQUFBQ0IwUlZoMGMyOW1kSGRoY21VQWFIUjBjSE02THk5cGJXRm4KWlcxaFoybGpheTV2Y21lOHp4MmRBQUFBR0hSRldIUlVhSFZ0WWpvNlJHOWpkVzFsYm5RNk9sQmhaMlZ6QURHbi83c3ZBQUFBRjNSRgpXSFJVYUhWdFlqbzZTVzFoWjJVNk9raGxhV2RvZEFBek1pajArUFFBQUFBV2RFVllkRlJvZFcxaU9qcEpiV0ZuWlRvNlYybGtkR2dBCk16TFFXemg1QUFBQUdYUkZXSFJVYUhWdFlqbzZUV2x0WlhSNWNHVUFhVzFoWjJVdmNHNW5QN0pXVGdBQUFCZDBSVmgwVkdoMWJXSTYKT2sxVWFXMWxBREUxT1RNMk5qYzBNemp6RkI4NUFBQUFFWFJGV0hSVWFIVnRZam82VTJsNlpRQTVNREJDUXJPOW5IVUFBQUJHZEVWWQpkRlJvZFcxaU9qcFZVa2tBWm1sc1pUb3ZMeTloY0hBdmRHMXdMMmx0WVdkbGJHTXZhVzFuZG1sbGR6SmZPVjh4TlRreU5UVTROVFF6Ck5UTTJOVEUxTWw4eU9WOWJNRjBnc0hhZkFBQUFBRWxGVGtTdVFtQ0MiID48L2ltYWdlPgo8L3N2Zz4K',
      collectStar2: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiPiAgPGltYWdlIGlkPSJpbWFnZTAiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeD0iMCIgeT0iMCIKICAgIGhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ0FBQUFBZ0NBUUFBQURaYzdKL0FBQUFCR2RCVFVFQUFMR1BDL3hoQlFBQUFDQmpTRkpOCkFBQjZKZ0FBZ0lRQUFQb0FBQUNBNkFBQWRUQUFBT3BnQUFBNm1BQUFGM0NjdWxFOEFBQUFBbUpMUjBRQS80ZVB6TDhBQUFBSGRFbE4KUlFma0J3SVZHd0lFL1N5Q0FBQUI5VWxFUVZSSXg2VlZUV3NUVVJROTk5azBIODNISkdBUmxBcTJvZ3RwSXdWWExpUkNYZnNiRkQ4UQpMQVZGRndyK0FjV2RwWW8vd1oyZzlBY1VDcUZHVkZTQ1N1bkNoc3g3NDBRYjIzeGNGeWJPWkh3VDNxVDNiV1llNTV3NTU4MjdYRERDCmw3b3ZhN0t1SG5Jc0hET0VMbS9iM0Z1UHcxSEUwTmV2UTd0ZmtmajdUSHVKNmVTV0hpZEMrTmhiNnRNQkhtL2VDc09GT0hDczdpWXkKdm8yZDJORk1QWUlEdmpGQUIxS3R4U2dPVXVvYkh3d0FuZndVR29ZT25NdEJPc0NXdW03bVFEUm0ycXM4cGNGK0h5K2xQNk9qRjBqOApPTlU1VFVVVWVRNFRDSzhtM3FNaUtxamdyZVgwQk5RVlhNTXNIMERFb2lvL0tUd2lkYkg3SWlyVmwzZUpaSlduUnhlZ0wyVHZJRG02CkFKb0NyL1pCQjE2U2U2SlZIbnJ1dzhvZG14ZVpUM1FCN2tqNW5iR0ZiSlVZZ0h1bTg1cXRpSFFwRm5MbDNsWE9ybE9KN0VqME9wM1AKbFlGL3ZXQnQ0QnhxeHZ3YVN0YWJucFRYQzQyVDdUV1RJS1JpWjlNZittKytic3g4Uk5mazg5enk2QU1DelNOY01Bb3crWE5TSy9DNwphSG9FblZtdEFPYjJLY0RHQWdoeFlCeUJmQUxlYjV4UUxndERnZDE4R3UyQUEzVk1ROStpcStJU2JRYTNPZTRjL2k5Q1BIaVZ0OFZpCllTYS9ZajNQSHhjM3NUM2dnTWxyUDk4d1hlNFBVMW1YZHpnMU1FUlQ4cTZVdW1IckJ5WHRaN0ltTjlROXptcW5kYzUrSU45SnBaNXkKM052OUF5ZmVHbEhZaEhSR0FBQUFKWFJGV0hSa1lYUmxPbU55WldGMFpRQXlNREl3TFRBM0xUQXlWREV6T2pJM09qQXlLekE0T2pBdwpDVnplSEFBQUFDVjBSVmgwWkdGMFpUcHRiMlJwWm5rQU1qQXlNQzB3Tnkwd01sUXhNem95Tnpvd01pc3dPRG93TUhnQlpxQUFBQUFnCmRFVllkSE52Wm5SM1lYSmxBR2gwZEhCek9pOHZhVzFoWjJWdFlXZHBZMnN1YjNKbnZNOGRuUUFBQUJoMFJWaDBWR2gxYldJNk9rUnYKWTNWdFpXNTBPanBRWVdkbGN3QXhwLys3THdBQUFCZDBSVmgwVkdoMWJXSTZPa2x0WVdkbE9qcElaV2xuYUhRQU16SW85UGowQUFBQQpGblJGV0hSVWFIVnRZam82U1cxaFoyVTZPbGRwWkhSb0FETXkwRnM0ZVFBQUFCbDBSVmgwVkdoMWJXSTZPazFwYldWMGVYQmxBR2x0CllXZGxMM0J1WnoreVZrNEFBQUFYZEVWWWRGUm9kVzFpT2pwTlZHbHRaUUF4TlRrek5qWTNOakl5Q1Y0VENBQUFBQkYwUlZoMFZHaDEKYldJNk9sTnBlbVVBT0RZd1FrS3J0dW9aQUFBQVJuUkZXSFJVYUhWdFlqbzZWVkpKQUdacGJHVTZMeTh2WVhCd0wzUnRjQzlwYldGbgpaV3hqTDJsdFozWnBaWGN5WHpsZk1UVTVNalUxT0RVME1EQTFPVE0xTWpaZk1UUmZXekJkR0c2Tk1nQUFBQUJKUlU1RXJrSmdnZz09IiA+PC9pbWFnZT4KPC9zdmc+Cg==',
      config: {
        headers: {
          'token': localStorage.getItem('token')
        }
      },
      noneCollect: true
    }
  },
  mounted () {
    userCollection().then((res) => {
      if (res.code === 200) {
        this.collectIdList = res.data
        console.log(this.collectIdList)

        for (var i = 0; i < this.collectIdList.length; i++) {
          console.log(this.collectIdList[i])
          let config = {
            params: {
              id: this.collectIdList[i].postId
            }
          }
          postDetailById(config).then((res) => {
            console.log(res)
            if (res.code === 200) {
              if (res.data == null) {
                this.collectList.push({
                  title: '信息已删除',
                  id: config.params.id
                })
              } else {
                this.collectList.push(res.data)
              }
              this.noneCollect = false
            }
          })
        }
        // console.log(this.collectList)
        // if (this.collectIdList && this.collectIdList.length > 0) {
        //   this.noneCollect = false
        // }
      } else {
        this.$message({
          message: '获取收藏失败',
          type: 'error'
        })
      }
    })
  },
  methods: {
    goToDetailView (postId) {
      // 使用Vue Router导航到DetailView，并传递不同的cardId参数
      this.$router.push({name: 'PostDetailView', params: {postId}})
    },
    deleteCollection (postId) {
      let config = {
        params: {
          postId: postId
        }
      }
      delCollection(config).then((res) => {
        console.log(res)
        if (res.code === 200) {
          this.$message({
            message: '取消收藏成功',
            type: 'success'
          })
          location.reload()
        } else {
          this.$message({
            message: '取消收藏出错',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style>
.content {
  width: 100%;
  //background: white; border-radius: 5px;
}

.myCollectA {
  width: 100%;
  min-height: 80px;
  background: #1e1d1d;
  border: 1px solid rgb(49, 49, 49);
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin: 10px 0;
  transition: all 0.1s linear;
  &:hover {
    transform: scale(1.01);
  }
}

.myCollectA:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.myCollectA .myCollectTitle {
  font-size: 1rem;
  height: 100%;
  margin-left: 25px;
  font-weight: 600;
  color: rgb(56, 52, 52);
  flex: 9;

  .title {
    margin-bottom: 10px;
    font-size: 1.2rem;
    color: #ffffff;
  }
}

.myCollectA .myCollectStar {
  width: 10%;
  height: 100%;
  margin-left: 40px;
  text-align: center;
  flex: 1;
}

.myCollectA .myCollectStar img {
  width: 30px;
  display: block;
}
</style>
