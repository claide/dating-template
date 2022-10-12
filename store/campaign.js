export const state = () => ({
  s1: null,
  s2: null,
  s3: null,
  s4: null,
  s5: null,
  gclid: '',
  tracking_id: null,
  landing: 1,
})

export const mutations = {
  SET(state, campaign) {
    state.s1 = campaign.s1
    state.s2 = campaign.s2
    state.s3 = campaign.s3
    state.s4 = campaign.s4
    state.s5 = campaign.s5
    state.gclid = campaign.gclid
    state.tracking_id = campaign.tracking_id
    state.landing = campaign.landing || 1
  },
}
