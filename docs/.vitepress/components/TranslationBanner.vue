<script setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { data as allVersions } from '../data/versions.data.ts'

const { frontmatter, localeIndex } = useData()
const route = useRoute()

const defaultUrl = computed(() => {
  if (localeIndex.value === 'root') return null
  const prefix = localeIndex.value.startsWith('/') ? localeIndex.value : `/${localeIndex.value}/`
  let url = route.path.replace(prefix, '/')
  return url.replace(/\.html$/, '').replace(/\/$/, '') || '/'
})

const englishVersion = computed(() => {
  if (!defaultUrl.value) return null
  return allVersions[defaultUrl.value]
})

const isOutdated = computed(() => {
  if (!frontmatter.value?.version || !englishVersion.value) return false
  return String(frontmatter.value.version) !== String(englishVersion.value)
})
</script>

<template>
  <div v-if="isOutdated" class="translation-banner">
    <strong class="banner-title">⚠️ OUTDATED TRANSLATION ⚠️</strong>
    <p class="banner-text">
      This page is has not been brought up-to-date with the English (Primary) documentation, and may thus contain incorrect information.
    </p>
    <a :href="defaultUrl" class="banner-link">View the up-to-date English version &rarr;</a>
  </div>
</template>

<style scoped>
.translation-banner {
  background-color: var(--vp-c-warning-soft);
  color: var(--vp-c-warning-text);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  border: 1px solid var(--vp-c-warning-3);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.banner-title {
  margin: 0;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
}

.banner-text {
  margin: 0;
  font-weight: 500;
  font-size: 0.9rem;
}

.banner-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  align-self: flex-start;
  margin-top: 4px;
}

.banner-link:hover {
  text-decoration: underline;
}
</style>
