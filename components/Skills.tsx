'use client';

import { motion } from 'motion/react';
import { 
  Code2, 
  Database, 
  Layout, 
  Server, 
  Video, 
  TrendingUp, 
  Zap, 
  GitBranch, 
  Globe, 
  Smartphone, 
  Layers, 
  Cpu 
} from 'lucide-react';

export default function Skills() {
  const skillGroups = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React.js', icon: <Code2 size={24} /> },
        { name: 'Next.js', icon: <Layout size={24} /> },
        { name: 'Tailwind CSS', icon: <Zap size={24} /> },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', icon: <Server size={24} /> },
        { name: 'Express.js', icon: <Layers size={24} /> },
        { name: 'FastAPI', icon: <Cpu size={24} /> },
      ],
    },
    {
      title: 'Database',
      skills: [
        { name: 'MongoDB', icon: <Database size={24} /> },
        { name: 'Sequelize (SQL)', icon: <Database size={24} /> },
        { name: 'REST APIs', icon: <Globe size={24} /> },
      ],
    },
    {
      title: 'Creative',
      skills: [
        { name: 'Video Editing', icon: <Video size={24} /> },
        { name: 'Cinematography', icon: <Video size={24} /> },
        { name: 'Storytelling', icon: <Video size={24} /> },
      ],
    },
    {
      title: 'Business',
      skills: [
        { name: 'E-commerce', icon: <TrendingUp size={24} /> },
        { name: 'Digital Products', icon: <Smartphone size={24} /> },
        { name: 'Automation (n8n, Playwright)', icon: <Zap size={24} /> },
      ],
    },
  ];

  return (
    <section id="skills" className="py-32 relative bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-4 text-center mb-24">
          <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-white/40">Expertise</h2>
          <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white leading-[0.9]">
            The <span className="text-white/20">Toolkit.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {skillGroups.map((group, groupIdx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIdx * 0.1 }}
              className="p-8 glass rounded-3xl space-y-8 hover:border-white/20 transition-all group"
            >
              <h4 className="text-lg font-bold text-white tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                {group.title}
              </h4>
              <div className="space-y-6">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-4 text-zinc-400 group-hover:text-white transition-colors">
                    <div className="p-2 rounded-xl bg-white/5 text-white/40 group-hover:text-white transition-colors">
                      {skill.icon}
                    </div>
                    <span className="font-medium tracking-tight">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
