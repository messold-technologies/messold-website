function showCard(index) {
  const cards = document.querySelectorAll('#prmkt .card');
  const buttons = document.querySelectorAll('#prmkt .tab-btn');
  const planNames = ['basic', 'grow', 'advanced'];

  cards.forEach((card, i) => {
    const isActive = i === index;
    card.classList.toggle('active', isActive);
    buttons[i].classList.toggle('active', isActive);
  });

  // Update mobile view table column
  switchPlan(planNames[index]);
}

function toggleTable() {
  const wrapper = document.getElementById('comparison-table-wrapper');
  const showBtn = document.getElementById('toggleCompareBtn');
  const closeBtn = document.getElementById('toggleCompareBtnClose');

  const isHidden = wrapper.style.display === 'none' || wrapper.style.display === '';

  // Toggle visibility using display directly
  wrapper.style.display = isHidden ? 'block' : 'none';
  closeBtn.style.display = isHidden ? 'block' : 'none';

  // Update show button content
  if (isHidden) {
    wrapper.scrollIntoView({ behavior: 'smooth' });
    showBtn.innerHTML = `<span class="plus-icon">−</span> Close compare all`;
    if (window.innerWidth <= 768) {
      showBtn.classList.add('open');
    }
  } else {
    showBtn.innerHTML = `<span class="plus-icon">+</span> Full list of features`;
    if (window.innerWidth <= 768) {
      showBtn.classList.remove('open');
    }
  }
}





function switchPlan(plan) {
  const tabs = document.querySelectorAll('#prmkt .mobile-tabs button');
  tabs.forEach(btn => btn.classList.remove('active'));

  const activeTab = document.getElementById(`tab-${plan}`);
  if (activeTab) activeTab.classList.add('active');

  const table = document.querySelector('.comparison-table');
  if (table) table.setAttribute('data-active', plan);
}

// Set initial state on page load
document.addEventListener('DOMContentLoaded', () => {
  switchPlan('basic');
  showCard(0);
});




document.querySelectorAll("#prfaq .faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    item.classList.toggle("active");
  });
});

