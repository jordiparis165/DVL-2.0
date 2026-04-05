<script setup>
defineProps({
  compact: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="school-lockup" :class="{ compact }" aria-label="ESILV">
    <div class="school-logo" role="img" aria-label="Logo ESILV">
      <div class="logo-mark-row">
        <span class="logo-mark-stem" />
        <span class="logo-mark-drop" />
      </div>
      <strong class="logo-wordmark">ESILV</strong>
      <div class="logo-submark">
        <span>DE VINCI</span>
        <span>ENGINEERING</span>
        <span>SCHOOL</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.school-lockup {
  display: inline-block;
}

.school-logo {
  display: grid;
  justify-items: center;
  width: 108px;
  padding: 10px 8px 12px;
  border-radius: 20px;
  background: #d4145a;
  color: #fff;
  box-shadow: 0 18px 34px rgba(212, 20, 90, 0.22);
}

.logo-mark-row {
  position: relative;
  width: 38px;
  height: 34px;
  margin-bottom: 6px;
}

.logo-mark-stem {
  position: absolute;
  left: 4px;
  top: 2px;
  width: 12px;
  height: 28px;
  border-radius: 10px 10px 18px 18px;
  background: #fff;
  transform: rotate(-28deg);
}

.logo-mark-drop {
  position: absolute;
  right: 5px;
  top: 0;
  width: 14px;
  height: 20px;
  border-radius: 14px 14px 14px 14px / 14px 14px 9px 9px;
  background: #fff;
  clip-path: polygon(50% 0%, 88% 22%, 100% 46%, 50% 100%, 0% 46%, 12% 22%);
}

.logo-wordmark {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.65rem;
  line-height: 1;
  letter-spacing: 0.04em;
}

.logo-submark {
  display: grid;
  justify-items: center;
  margin-top: 6px;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.34rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.08;
}

.compact .school-logo {
  width: 82px;
  padding: 8px 6px 9px;
  border-radius: 16px;
}

.compact .logo-mark-row {
  width: 30px;
  height: 26px;
  margin-bottom: 4px;
}

.compact .logo-mark-stem {
  width: 10px;
  height: 22px;
}

.compact .logo-mark-drop {
  width: 11px;
  height: 16px;
}

.compact .logo-wordmark {
  font-size: 1.28rem;
}

.compact .logo-submark {
  margin-top: 4px;
  font-size: 0.26rem;
}
</style>
